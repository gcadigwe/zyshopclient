import * as actionTypes from '../actions/actionTypes'


const Search = (state={text:""},action) =>{
    switch (action.type) {
        case actionTypes.SEARCH_QUERY:
            return {...state,...action.payload}

        default:
            return state;
    }
}


export default Search;