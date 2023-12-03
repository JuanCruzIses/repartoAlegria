const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const { array } = require("joi");
import { MercadoPagoConfig } from 'mercadopago';
const client = new MercadoPagoConfig({ accessToken: 'TEST-1294267515511995-111514-0168c629aa7d6403fa10a566886cd248-401896659', options: { timeout: 5000 } });

const preference = new preference(client);
// preference.create({ body: {
// 	items: [
// 		{
// 			id: '<ID>',
// 			title: '<title>',
// 			quantity: 1,
// 			unit_price: 100
// 		}
// 	],
// } }).then(console.log).catch(console.log);


// mercadopago.configure({
// 	access_token: "TEST-1294267515511995-111514-0168c629aa7d6403fa10a566886cd248-401896659",
// });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("../../client/html-js"));
app.use(cors());
app.get("/", function (req, res) {
	res.status(200).sendFile("index.html");
});

app.post("/create_preference", (req, res) => {
	let newPreference = {
		items: [
			{
				title: 'Compra de canasta',
				unit_price: req.body.price,
				client_name: req.body.name,
				client_phone: Number(req.body.phone),
				client_location: req.body.location,
				list_products: req.body.list,
				quantity: 1 
			}
		],
		// back_urls: {
		// 	"success": "http://localhost:8080/feedback",
		// 	"failure": "http://localhost:8080/feedback",
		// 	"pending": "http://localhost:8080/feedback"
		// },
		// auto_return: "approved",
	};
	preference.create(newPreference)
		.then(function (response) {
			console.log('El response')
			console.log(response)

			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});


