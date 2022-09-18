
const APIKEY = 'ckey_bcf2a8cd82204dc3a01733fa007';
const baseURL = 'https://api.covalenthq.com/v1';
var blockchainChainId;
var demoAddress =" ";
//= '0xDc35C75d027E4E65824cC656f655BcA90505C722'// IMP addr : 0xe4605d46fd0b3f8329d936a8b258d69276cba264
const token_ids = []
let output = "";
async function getNftData(chainId, address) {


	const url = new URL(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}&nft=true`);
	console.log("Url = " + url)

	//const url = "https://api.covalenthq.com/v1/137/address/0xDc35C75d027E4E65824cC656f655BcA90505C722/balances_v2/?key=ckey_bcf2a8cd82204dc3a01733fa007&nft=true"

	const response = await fetch(url);
	const result = await response.json();
	const data = result.data.items;
	for (var i = 0; i < data.length; i++) {
		if (data[i]["nft_data"] != null) {
			for (var j = 0; j < data[i]["nft_data"].length; j++) {
				console.log("Nft = " + data[i]["nft_data"][j].external_data["name"])
				const name_l = data[i]["nft_data"][j].external_data["name"];
				const description_l = data[i]["nft_data"][j].external_data["description"];
				const image_l = data[i]["nft_data"][j].external_data["image"];
				const price = data[i]["nft_data"][j].token_quote_rate_eth
				console.log("Nft Name = " + name_l + "Description =" + description_l + "image=" + image_l)

				pushData(name_l, description_l, image_l, price);


			}
		}
	}
	console.log("Data = ", data)
	/*  */return data;
}



function getaddr() {
	var demoAddress = document.getElementById("waddress").value;
	console.log("The wallet address is  " + demoAddress);
	console.log("I am executed")
	console.log(typeof (demoAddress))
	getNftData(137, demoAddress);

	//getTokenData(blockchainChainId, demoAddress);

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
	
		<div class="card"><img class="card__img" src=${image}" alt="NFT IMAGE">
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
