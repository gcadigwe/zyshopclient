import React from 'react';
import NewArrivals from '../components/Home/NewArrivals'
import BestSellers from '../components/Home/BestSellers'
import Jumbotron from '../components/cards/typewriter';
import CategoryList from '../components/Category/CategoryList'
import SubList from '../components/Subs/SubList'


const Home = () => {


   
    return(
        <div>
            <div className="jumbotron text-danger h1 text-weight-bold text-center">
                {/* {loading ? <Spinner /> : <h4>Products</h4>} */}
                <Jumbotron text={["Latest Products","New Arrivals","Best Sellers"]}/>
            </div>

            <div className="jumbotron text-center mb-5 mt-5 p-3 display-4">
                New Arrivals
            </div>

            <NewArrivals />
            <br /><br />

            <div className="jumbotron text-center mb-5 mt-5 p-3 display-4">
                Best Sellers
            </div>

            <BestSellers />

            <div className="jumbotron text-center mb-5 mt-5 p-3 display-4">
                Categories
            </div>

            <CategoryList />

            <div className="jumbotron text-center mb-5 mt-5 p-3 display-4">
                SubCategories
            </div>

            <SubList />

        </div>
    )
}

export default Home;