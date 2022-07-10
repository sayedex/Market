import { BigInt } from "@graphprotocol/graph-ts"
import {
  Marketplace,
  BuyPriceSell,
  NFTClaimed,
  NFTRefunded,
  NewAuction,
  NewBidOnAuction,
  Nftselltotopbidder,
  TokensClaimed
} from "../generated/Marketplace/Marketplace"
import { NewAuctionScma } from "../generated/schema"

export function NewAuctionListed(event: NewAuction): void {
  let transactionHash = event.transaction.hash.toHexString()
  let token = NewAuctionScma.load(transactionHash);
  if (token==null) {
       token = new NewAuctionScma(transactionHash);
    }
    // token.id = event.transaction.hash.toHexString();
    token.index = event.params.index;
    token.addressPaymentToken = event.params.addressPaymentToken;
    token.NFTID = event.params.nftId;
    token.creator = event.transaction.from;
    token.currentBidOwner = event.params.currentBidOwner;
    token.BuyNowprice = event.params.BuyNowprice;
    token.endAuction = event.params.endAuction;
    token.bidCount = event.params.bidCount;
    token.sold = false;

token.save()
}

export function Selloutwithbuyprice(event: BuyPriceSell): void {
  // let auction = event.transaction.hash.toHexString()
  let transactionHash = event.transaction.hash.toHexString()
  let token = NewAuctionScma.load(transactionHash);

if(token!==null){
  token.sold=true;
  token.save();

}
}

