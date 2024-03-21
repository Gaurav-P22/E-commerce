import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { fireDb,auth } from '../../firebase/FirebaseConfig';
import { QuerySnapshot, Timestamp, addDoc, collection, onSnapshot, orderBy, query,doc, setDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
  const [mode, setMode] = useState('light');  
  const [loading, setLoading] = useState(false); 
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDb, "products")
    setLoading(true)
    try {
      await addDoc(productRef, products)
      toast.success("Product Add successfully")
      window.location.href='/dashboard'
      getProductData()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    setLoading(true)
    try {
      const q=query(
        collection(fireDb,'products'),
        orderBy('time')
      );
      const data=onSnapshot(q,(QuerySnapshot)=>{
        let productArray=[]
        QuerySnapshot.forEach((doc)=>{
          productArray.push({...doc.data(),id:doc.id});
        });
        setProduct(productArray)
        setLoading(false)
      });
      return ()=>data;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);
//update

const editHandle=(item)=>{
  setProducts(item)
}
const updateProduct=async()=>{
  setLoading(true)
  try {
    await setDoc(doc(fireDb,'products',products.id),products)
    toast.success("Product Updated Successfully")
    getProductData();
    window.location.href='/dashboard'
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

//delete Product

const deleteProduct=async(item)=>{
  setLoading(true)
  try {
    await deleteDoc(doc(fireDb,'products',item.id))
    toast.success('Product Deleted Successfully')
    getProductData()
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading,setLoading,
      products, setProducts,addProduct,product ,
      editHandle,updateProduct,deleteProduct}}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState