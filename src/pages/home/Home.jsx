import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filters/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonials/Testimonials'
import Track from '../../components/track/Track'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'

function Home() {
 
   
    
    
  return (
    
      <Layout>
      
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <Track/>
        <Testimonial/>
      </Layout>
    

  )
}

export default Home
