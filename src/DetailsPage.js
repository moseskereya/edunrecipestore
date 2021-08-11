import React, { Component } from 'react';
import axios from "axios"
class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singlerecipe:[]
         }
    }

    componentDidMount = () => {
        const APP_ID = '4e9f05eb';
        const APP_KEY = '9b904d703fa0d46a88ce1ac63f29f498';
        const query = this.props.location.state.food;
        const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=100&health=alcohol-free`;
        axios.get(url)
            .then(res => {
                const result = res.data.hits[0].recipe
                this.setState({ singlerecipe: result })
                console.log(this.state.singlerecipe)
            })
            .catch(err => {
             console.log(err)
        })
    }

    
    render() {
        const recipe = this.state.singlerecipe;


        if(recipe === undefined || Object.keys(recipe).length === 0) {
            return (
                <div>
                    <h1>Loading....</h1>
                 </div>
             )
        } else{
            return (
                <div>
                    <h1>{recipe.cuisineType}</h1>
                    <h5> Label: {recipe.label}</h5>
                    <img src={recipe.image} alt="image_" />
                    <h3> Calories : {recipe.calories}</h3>
                    <h3>Weight: {recipe.totalWeight}</h3>
                    <p> ingredientLines: {recipe.ingredientLines}</p>
                    {recipe.ingredients.map(item => {
                        return (
                            <div>
                                <p>{item.text}</p>
                                <img src={item.image} alt=""/>
                            </div>
                        )
                    })}
               <ul>
                {recipe.digest.map(item => {
                    return (
                        <li>
                            {item.label}
                        </li>
                    )
                })}
                    </ul>
                    <ul>
                        {recipe.digest.map(item => {
                            return (
                                <li>
                                    {item.tag}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );
        }
    }
}

 
export default DetailsPage;