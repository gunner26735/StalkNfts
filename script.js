
const APIKEY = 'ckey_bcf2a8cd82204dc3a01733fa007';
const baseURL = 'https://api.covalenthq.com/v1'
const blockchainChainId = '1'
const demoAddress = '0xe4605d46fd0b3f8329d936a8b258d69276cba264'
const token_ids = []
let output = "";
async function getNftData(chainId, address, token_id) {

	const url = new URL(`${baseURL}/${chainId}/tokens/${address}/nft_metadata/${token_id}/?key=${APIKEY}`);

	const response = await fetch(url);
	const result = await response.json();
	const data = result.data.items[0].nft_data[0];
	console.log("Data = ", data)
	const tokenid = data.token_id;
	const name_l = data["external_data"].name;
	const description_l = data["external_data"].description;
	const image_l = data["external_data"].image;
	console.log("Nft Name = " + name_l + "Description =" + description_l + "image=" + image_l)
	const price = data["token_quote_rate_eth"]
	console.log("Price = " + price)
	pushData(name_l, description_l, image_l, price);
	return data;
} 

console.log("Hello")
async function getTokenData(chainId, address) {
	const url = new URL(`${baseURL}/${chainId}/tokens/${address}/nft_token_ids/?key=${APIKEY}`);

	const response = await fetch(url);
	const result = await response.json();
	const data = result.data.items;
	// do data.length to make it dynamic
	for (var i = 0; i <7; i++) {
		//token_ids[i] = data[i]["token_id"]
		getNftData(blockchainChainId, demoAddress, data[i]["token_id"]);
	}
	console.log(token_ids)
	
}

getTokenData(blockchainChainId, demoAddress);


function pushData(name_l, desc, image, price) {
	output += `
			<div class="product">
			<img src="${image}" alt="${desc}">
				<p class="name">${name_l}</p>
				<p class="description">${desc}</p>
				<p class="price">
					<span>${price}</span>
					<span>&euro;</span>
				</p>
				<p class="cart">Add to cart <i class="bx bx-cart-alt"></i></p>
			</div>
		`;
		document.querySelector(".products").innerHTML = output;
} 



// Example address request
