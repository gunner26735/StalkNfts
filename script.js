
const APIKEY = 'ckey_bcf2a8cd82204dc3a01733fa007';
const baseURL = 'https://api.covalenthq.com/v1';
var blockchainChainId;
var demoAddress =" ";
//= '0xDc35C75d027E4E65824cC656f655BcA90505C722'// IMP addr : 0xe4605d46fd0b3f8329d936a8b258d69276cba264
const token_ids = []
let output = "";
async function getNftData(chainId, address, token_id) {

	console.log("Address = "+address)
	const url = new URL(`${baseURL}/${chainId}/tokens/${address}/nft_metadata/${token_id}/?key=${APIKEY}`);

	const response = await fetch(url);
	const result = await response.json();
	const data = result.data.items[0].nft_data[0];
	console.log("Data = ", data)
	const tokenid = data.token_id;
	const name_l = data["external_data"].name;
	const description_l = data["external_data"].description;
	const image_l = data["external_data"].image;
	//console.log("Nft Name = " + name_l + "Description =" + description_l + "image=" + image_l)
	const price = data["token_quote_rate_eth"]
	//console.log("Price = " + price)
	pushData(name_l, description_l, image_l, price);
	return data;
} 
function getaddr(){
	var demoAddress= document.getElementById("waddress").value;
	console.log("The wallet address is  " + demoAddress);
  	console.log("I am executed")
  	console.log(typeof(demoAddress))
	
	var r_chainid = document.getElementById("format").value;
	blockchainChainId = r_chainid
	getTokenData(blockchainChainId, demoAddress);
	console.log(r_chainid)
  }

async function getTokenData(chainId, address) {
	const url = new URL(`${baseURL}/${chainId}/tokens/${address}/nft_token_ids/?key=${APIKEY}`);
	console.log("In Gettokendata")

	const response = await fetch(url);
	const result = await response.json();
	const data = result.data.items;
	// do data.length to make it dynamic
	for (var i = 0; i <7; i++) {
		//token_ids[i] = data[i]["token_id"]
		getNftData(blockchainChainId, address, data[i]["token_id"]);
	}
	
}

function pushData(name_l, desc, image, price) {
	if(price == null){
		price = 0.0;
	}
	output += `
	<div class="grid__item">
		<div class="card"><img class="card__img" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80" alt="NFT IMAGE">
		<div class="card__content">
			<h1 class="card__header">${name_l}</h1>
			<p class="card__text">${desc} </p>
			<button class="card__btn">${price}<span>&rarr;</span></button>
		</div>
		</div>
	</div>
		`;
		document.querySelector(".grid").innerHTML = output;
} 
