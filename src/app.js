const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//Define Path for Express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup Handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'My Weather App',
        name: 'Don Asok'
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'My About Page',
        desc:'lorem ipisum',
        name: 'Don Asok'
    })

})
app.get('/help',(req, res) => {
    res.render('help',{
        title: 'My Help Page',
        desc: 'Help description message',
        name: 'Don Asok'
    })
})

app.get('/weather', (req, res)=>{

    let address = req.query.address;

    if(!address){
        return res.send({
            error: 'Provide a valid address - no address'
        })
    }

    geocode(address, (error, {latitude,longitude,location} = {})=>{

        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {summary, temp} = {})=>{

            if(error) {
                return res.send({error})
            }

            res.send(
                {
                    summary,
                    temp,
                    location
                }
            )

        })
    })
    
    // res.send({
    //     forecast: 'Humid',
    //     location: 'Singapore',
    //     address: req.query.address
    // })
})

app.get('/products',(req, res)=>{

    if (!req.query.search){

        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


app.get('/help/*',(req, res)=>{
    res.render('page-not-found',{
        title: 'My Error Page',
        errorMsg: ' Article not found',
        name: 'Don Asok'
    })

})


app.get('*',(req, res)=>{
    res.render('page-not-found',{
        title: 'My Error Page',
        errorMsg: ' Page not found',
        name: 'Don Asok'
    })

})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})