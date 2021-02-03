import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import {getSubs} from '../../function/sub'

const SubList = () => {
    const [sub,setSub] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getSubs()
        .then(res => {
            setLoading(false)
            console.log(res.data)
            setSub(res.data)
        })
    },[])




    const showSubs = () =>
    sub.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
}

export default SubList;