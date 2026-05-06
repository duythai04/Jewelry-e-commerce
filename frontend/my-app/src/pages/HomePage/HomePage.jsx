import React from 'react';

import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Categories from '../../sections/Categories/Categories';
import HeroHero from '../../components/HeroHero/HeroHero';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import CollectionStory from '../../sections/CollectionStory/CollectionStory';
import LuxuryServices from '../../sections/LuxuryServices/LuxuryServices';
import ProductLookbook from '../../sections/ProductLookbook/ProductLookbook';
import SocialAndNewsletter from '../../sections/SocialAndNewsletter/SocialAndNewsletter';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroHero/>
        <Banner />
        <Categories />
        <FeaturedProducts/>
        <ProductLookbook/>
        <LuxuryServices/>
        <CollectionStory/>
        <SocialAndNewsletter/>
        
      </main>
      <Footer/>
    </>
  );
};

export default HomePage;