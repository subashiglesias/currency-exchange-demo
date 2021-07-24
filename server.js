const express = require("express");
const axios = require("axios");
const moment = require("moment");
const helmet = require('helmet')
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use(helmet())

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: [
            '\'self\'',
            'https://v6.exchangerate-api.com/',
        ],
        styleSrc: [
            '\'self\'',
            '\'unsafe-inline\'',
        ],
        scriptSrc: [
            '\'self\'',
            '\'unsafe-inline\'',
        ]
    }
}))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.get("/campaigns/list", async function (req, res) {
    await axios.get('https://testapi.donatekart.com/api/campaign')
        .then(response => {
            if (response.data.length) {
                const data = response.data.sort((a, b) => b.totalAmount - a.totalAmount).map(campaign => {
                    return {
                        title: campaign.title,
                        totalAmount: campaign.totalAmount,
                        backersCount: campaign.backersCount,
                        endDate: campaign.endDate
                    }
                })
                return data.length ? res.send(data) : res.status(404)
            }
        })
        .catch(err => {
            return res.status(500).send("Please try again after sometime")
        })
})

app.get("/campaigns/active", async function (req, res) {
    await axios.get('https://testapi.donatekart.com/api/campaign')
        .then(response => {
            if (response.data.length) {
                const data = response.data
                    .filter(campaign => moment(campaign.endDate).isSameOrAfter(moment()))
                    .filter(campaign => moment(campaign.created).isAfter(moment().subtract(30, 'days')))
                return data.length ? res.send(data) : res.status(404)
            }
        })
        .catch(err => {
            return res.status(500).send("Please try again after sometime")
        })
})

app.get("/campaigns/closed", async function (req, res) {
    await axios.get('https://testapi.donatekart.com/api/campaign')
        .then(response => {
            if (response.data.length) {
                const data = response.data
                    .filter(campaign => (moment(campaign.endDate).isBefore(moment()) || (campaign.procuredAmount > campaign.totalAmount)))
                return data.length ? res.send(data) : res.status(404)
            }
        })
        .catch(err => {
            return res.status(500).send("Please try again after sometime")
        })
})

app.use(express.static("build"));

app.listen(port);