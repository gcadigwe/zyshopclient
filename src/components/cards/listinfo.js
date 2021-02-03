import React from 'react';
import {Link} from 'react-router-dom';

const Listinfo = ({product}) => {
    const {price,slug,category,subs,quantity,color,brand,shipping,sold} = product

    return (

        <div>
        <ul className="list-group">
            <li className="list-group-item">
                Price <span className="label label-default label-pill pull-xs-right">$ {price}</span>
            </li>
        </ul>

            {category && (<ul className="list-group">
            <li className="list-group-item">
                Category <Link to={`category/${category.slug}`} className="label label-default label-pill pull-xs-right">{category.name}</Link>
            </li>
            </ul>)}


            <ul className="list-group">
                {subs && subs.map(s => (
                    <li className="list-group-item">
                    Sub Category <Link key={s._id} to={`sub/${s.slug}`} className="label label-default label-pill pull-xs-right">{s.name}</Link>
                </li>
                ))}
            </ul>

            <ul className="list-group">
            <li className="list-group-item">
                Shipping <span className="label label-default label-pill pull-xs-right">{shipping}</span>
            </li>
            </ul>

            <ul className="list-group">
            <li className="list-group-item">
                Color <span className="label label-default label-pill pull-xs-right">{color}</span>
            </li>
            </ul>

            <ul className="list-group">
            <li className="list-group-item">
                Brand <span className="label label-default label-pill pull-xs-right">{brand}</span>
            </li>
            </ul>

            <ul className="list-group">
            <li className="list-group-item">
                Available <span className="label label-default label-pill pull-xs-right">{quantity}</span>
            </li>
            </ul>


            <ul className="list-group">
            <li className="list-group-item">
                Sold <span className="label label-default label-pill pull-xs-right">{sold}</span>
            </li>
            </ul>


        </div>
        
    )
}

export default Listinfo;