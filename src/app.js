
//Production - Heroku

const express = require('express')
const port = process.env.PORT || 3000


const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()

//Define path for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engin and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather',
        name : 'Mack'
    })
})


app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'Help Me'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About Me'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({
            error : 'Please provide the address'
        })
    }

    geocode(req.query.address, (error, data={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }

        const {lat, lon} = data
        console.log(lat, lon)
        forcast(lat, lon, (error, result)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }

            res.send({
                result,
                address : req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res)=>{

    if(!req.query.search)
    {
        return res.send({
            error : 'Please provoide search'
        })
    }

    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title : '404',
        errorMessage : 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log("Listening to port "+ port)
})
