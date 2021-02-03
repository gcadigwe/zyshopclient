import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {getProductsByCount,searchFilter} from '../function/product'
import ProductCard from '../components/cards/ProductCard'
import {Menu,Slider,Checkbox,Radio} from 'antd'
import {DollarOutlined,DownSquareOutlined,StarOutlined} from '@ant-design/icons'
import {getCategories} from '../function/category'
import Star from '../components/forms/Star'
import {getSubs} from '../function/sub'

const {SubMenu,ItemGroup} = Menu

const Shop = () => {
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [price,setPrice] = useState([0,0])
    const [categories,setCategories] = useState([])
    const [categoryIds,setCategoryIds] = useState([])
    const [ok,setOk] = useState(false)
    const [star, setStar] = useState("");
    const [subs,setSub] = useState([])
    const [subId,setSubId] = useState('')
    const [brands,setBrands] = useState([
        "Apple", "Samsung", "Richard Millie", "Lenovo", "Acer"
    ])
    const [brand,setBrand] = useState('')
    const [colors,setColors] = useState([
        "Black", "Brown", "Silver", "White", "Blue"
    ])
    const [color,setColor] = useState("")
    const [shipping,setShipping] = useState(["Yes","No"])
    const [ship,setShip] = useState("")

    const {Search} = useSelector((state)=>({...state}))
    const Dispatch = useDispatch()
    const {text} = Search

    useEffect(()=>{
        loadProducts()
        //loading Categories
        getCategories().then(res => {
            setCategories(res.data)
        })

        getSubs().then(res => {
            setSub(res.data)
            console.log(subs)
            console.log(subs)

        })
    },[])

    //for loading products on startup

    const loadProducts = () => {
        setLoading(true)
        getProductsByCount(12)
        .then(res => {
            setProducts(res.data)
            setLoading(false)
        })
    }

    //for searching products

    useEffect(()=>{
        const delayed = 
            setTimeout(()=>{
                fetchProducts({query:text})
            },300)

        return ()=>clearTimeout(delayed)
    },[text])

    const fetchProducts = (arg) => {
        searchFilter(arg).then(res => {
            setLoading(false)
            setProducts(res.data)
        })
    }

    //for searching with slider

    useEffect(()=>{
        console.log(ok)
        fetchProducts({price})
    },[ok])

    const HandleSlider = (value) => {
        Dispatch({
            type: "SEARCH_QUERY",
            payload:{text:""}
        })
        setBrand("")
        setColor("")
        setSubId("")
        setShip("")
        setCategoryIds([])
        setPrice(value)
        setTimeout(()=>{
            setOk(!ok)
        },300)
    }
    const showCategories = () => (
       categories.map(c => (
           <div key={c._id}>
               <Checkbox checked={categoryIds.includes(c._id)} onChange={handleChange} value={c._id} className="pl-4 pr-4 pb-2">
                   {c.name}
               </Checkbox>
           </div>
       ))
    )

    const handleChange = e => {
        Dispatch({
            type:"SEARCH_QUERY",
            payload:{text:""}
        })

        setPrice([0,0])
        setSubId('')
        setBrand("")
        setColor("")
        setShip("")

        let state = [...categoryIds]
        let latestid = e.target.value
        let isinState = state.indexOf(latestid) //if -1 no id in state array else it is found

        if (isinState === -1){
            state.push(e.target.value)
        }else{
            state.splice(isinState,1)
        }

        setCategoryIds(state)
        fetchProducts({category:state})
    }

    const handleStarClick = (num) => {
        // console.log(num);
        Dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(num);
        setSubId('')
        setColor("")
        setShip("")
        setBrand("")
        fetchProducts({ stars: num });
      };
    
      const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
          <Star starClick={handleStarClick} numberOfStars={5} />
          <Star starClick={handleStarClick} numberOfStars={4} />
          <Star starClick={handleStarClick} numberOfStars={3} />
          <Star starClick={handleStarClick} numberOfStars={2} />
          <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
      );

    //   const showSubs = () => (
    //       subs.map((s) => (
    //           <div className="p-1 m-1 badge badge-secondary" style={{cursor:'pointer'}} onClick={()=>handleSubClick(s)} key={s._id}>{s.name}</div>
    //       ))
    //   )

    const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));
      const handleSub = s => {
        setSubId(s._id)
        Dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
          });
          setPrice([0, 0]);
          setCategoryIds([]);
          setStar('');
          setColor("")
          setBrand("")
          fetchProducts({ sub: s._id });
      }

      const showBrands = () =>
      brands.map((b) => (
        <Radio
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          className="pb-1 pl-4 pr-4"
        >
          {b}
        </Radio>
      ));
  
    const handleBrand = (e) => {
        setSubId("")
      Dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setShip("")
      setStar("");
      setColor("")
      setBrand(e.target.value);
      fetchProducts({ brand: e.target.value });
    };

    const showColors = () => colors.map(c => (
        <Radio
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          className="pb-1 pl-4 pr-4"
        >
          {c}
        </Radio>
    ))

    const handleColor = e => {
        setSubId("")
        setBrand("")
        Dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setShip("")
        setStar("");
        setColor(e.target.value);
        fetchProducts({ color: e.target.value });
    }

    const showShipping = () => shipping.map(shipping => (
        <Radio
          value={shipping}
          name={shipping}
          checked={shipping === ship}
          onChange={handleShipping}
          className="pb-1 pl-4 pr-4"
        >
          {shipping}
        </Radio>
    ))

    const handleShipping = e => {
        setSubId("")
        setBrand("")
        Dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setShip(e.target.value);
        fetchProducts({ shipping: e.target.value });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Filter/search</h4>
                    <hr />

                    <Menu mode="inline" defaultOpenKeys={["1","2","3","4","5","6","7"]}>
                        <SubMenu key="1" title={<span className="h6"><DollarOutlined />Price</span>}> 
                            <div>
                                <Slider className="ml-4 mr-4" max="4999" tipFormatter={(v)=>`$${v}`} range value={price} onChange={HandleSlider} />
                            </div>
                        </SubMenu>

                        <SubMenu key="2" title={<span className="h6"><DownSquareOutlined />Categories</span>}> 
                            <div style={{marginTop:"-10px"}}>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        <SubMenu
                            key="3"
                            title={
                        <span className="h6">
                        <StarOutlined /> Rating
                         </span>}>
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>
            <SubMenu key="4" title={<span className="h6"><DownSquareOutlined />Sub Categories</span>}> 
                            <div className="pl-4 pr-4" style={{marginTop:"-10px"}}>
                                {showSubs()}
                            </div>
                        </SubMenu>

                        <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
                    </Menu>
                </div>

                <div className="col-md-9">
                    {products.length < 1 && "No Products Found"}
                    <div className="row">
                        {products.map((p)=>(
                            <div className="col-md-4" key={p._id}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;