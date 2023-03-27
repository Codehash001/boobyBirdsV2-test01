// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9; 

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";

contract BoobyBirds is ERC721A, Ownable, ReentrancyGuard, DefaultOperatorFilterer {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri  ; // replace the not-revelaed json link here

  uint256 public WhiteListMintCost = 0.03 ether;
  uint256 public PublicMintCost = 0.035 ether;

  uint256 public maxSupply = 3100;

  uint256 public MaxperWallet_PublicMint = 4;
  uint256 public MaxperWallet_OGMint = 1;
  uint256 public MaxperWallet_Whitelistmint = 4;
  

  bool public paused = true; 
  bool public revealed = false;
  bool public PublicMint_Live = false;
  bool public OGMint_Live = true; 
  bool public WhitelistMint_Live = true; 

  bytes32 public merkleRoot_OG = 0;
  bytes32 public merkleRoot_WL = 0;

  constructor(
    string memory _initBaseURI
  ) ERC721A("Booby Birds", "BoobyBirds") {
    setBaseURI(_initBaseURI);
    
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
  
  function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
  }
    
   //Operator Filter
    function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(address operator, uint256 tokenId) public payable override onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }
    function transferFrom(address from, address to, uint256 tokenId)
        public
        payable
             override
        onlyAllowedOperator(from)
    {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId)
        public
        payable
           override
        onlyAllowedOperator(from)
    {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
        public
        payable
          override
        onlyAllowedOperator(from)
    {
        super.safeTransferFrom(from, to, tokenId, data);
    }



  /// @dev OGMint (free mint)
    function OGMint(uint256 tokens, bytes32[] calldata merkleProof) public nonReentrant {
    require(!paused, "oops contract is paused");
    require(OGMint_Live, "mint phase hasn't started yet");
    require(MerkleProof.verify(merkleProof, merkleRoot_OG, keccak256(abi.encodePacked(msg.sender))), " You are not in the OG List");
    uint256 supply = totalSupply();
    require(_numberMinted(_msgSender()) + tokens <= MaxperWallet_OGMint, "Max NFTs Per Wallet exceeded");
    require(tokens > 0, "need to mint at least 1 NFT");
    require(supply + tokens <= maxSupply, "We Soldout");
    require(tokens <= MaxperWallet_OGMint, "max mint per Tx exceeded");

      _safeMint(_msgSender(), tokens);
    
  }

/// @dev WhiteList Mint
  function WhitelistedMint(uint256 tokens, bytes32[] calldata merkleProof) public payable nonReentrant {
    require(!paused, "oops contract is paused");
    require(WhitelistMint_Live, "Sale Hasn't started yet");
    require(MerkleProof.verify(merkleProof, merkleRoot_WL, keccak256(abi.encodePacked(msg.sender))), " You are not in the OG List");
    uint256 supply = totalSupply();
    require(tokens > 0, "need to mint at least 1 NFT");
    require(supply + tokens <= maxSupply, "We Soldout");
    require(_numberMinted(_msgSender()) + tokens <= MaxperWallet_Whitelistmint, " Max NFTs Per Wallet exceeded");
    require(msg.value >= WhiteListMintCost * tokens, "insufficient funds");
    require(tokens <= MaxperWallet_Whitelistmint, "max mint amount per tx exceeded");

      _safeMint(_msgSender(), tokens);
    
  }

/// @dev  Public Mint
  function PublicMint(uint256 tokens , bytes32[] calldata merkleProof) public payable nonReentrant {
    require(!paused, "oops contract is paused");
    require(PublicMint_Live, "Sale Hasn't started yet");
    uint256 supply = totalSupply();
    require(tokens > 0, "need to mint at least 1 NFT");
    require(supply + tokens <= maxSupply, "We Soldout");

    bool OGListedWallet = (MerkleProof.verify(merkleProof, merkleRoot_OG, keccak256(abi.encodePacked(msg.sender))));
  
    if (OGListedWallet) {
       require(_numberMinted(_msgSender()) + tokens <= MaxperWallet_PublicMint + MaxperWallet_OGMint, " Max NFTs Per Wallet exceeded");
    }

    bool WhitelistedWallet = (MerkleProof.verify(merkleProof, merkleRoot_WL, keccak256(abi.encodePacked(msg.sender))));
    
    if (WhitelistedWallet) {
        require(_numberMinted(_msgSender()) + tokens <= MaxperWallet_PublicMint + MaxperWallet_Whitelistmint, " Max NFTs Per Wallet exceeded");
    }
    
    if (!OGListedWallet && !WhitelistedWallet ){
    	require(_numberMinted(_msgSender()) + tokens <= MaxperWallet_PublicMint , " Max NFTs Per Wallet exceeded");
    }
    
    require(msg.value >= PublicMintCost * tokens, "insufficient funds");


      _safeMint(_msgSender(), tokens);
    
  }

  /// @dev use it for giveaway and mint for yourself
     function gift(uint256 _mintAmount, address destination) public onlyOwner nonReentrant {
    uint256 supply = totalSupply();
    require(supply + _mintAmount <= maxSupply, "Soldout");

      _safeMint(destination, _mintAmount);
    
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721AMetadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

    function numberMinted(address owner) public view returns (uint256) {
    return _numberMinted(owner);
  }

  //only owner
  function reveal(bool _state) public onlyOwner {
      revealed = _state;
  }

  function setMerkleRoot_OG(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot_OG = _merkleRoot;
    }
  
  function setMerkleRoot_WL(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot_WL = _merkleRoot;
    }
  
  function setMaxperWallet_PublicMint(uint256 _limit) public onlyOwner {
    MaxperWallet_PublicMint = _limit;
  }

    function setMaxperWallet_OGMint(uint256 _limit) public onlyOwner {
    MaxperWallet_OGMint = _limit;
  }

   function setMaxperWallet_WhitelistMint(uint256 _limit) public onlyOwner {
    MaxperWallet_Whitelistmint = _limit;
  }
  
  function setWhiteListMintCost(uint256 _newCost) public onlyOwner {
    WhiteListMintCost = _newCost;
  }
  
  function setPublicMintCost(uint256 _newCost) public onlyOwner {
    PublicMintCost = _newCost;
  }


    function setMaxsupply(uint256 _newsupply) public onlyOwner {
    maxSupply = _newsupply;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

  function toggle_PublicMint_Live(bool _state) external onlyOwner {
        PublicMint_Live = _state;
    }

  function toggle_OGMint_Live(bool _state) external onlyOwner {
        OGMint_Live = _state;
    }

  function toggle_WhitelistMint_Live(bool _state) external onlyOwner {
        WhitelistMint_Live = _state;
    }
  
 
  function withdraw() public payable onlyOwner nonReentrant {
    (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
    require(success);
  }
}
