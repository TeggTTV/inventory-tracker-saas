import React from 'react';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function Home() {
    return (
        <NextThemesProvider defaultTheme='system' attribute='class'>
                <Navbar />
                <Hero />
                <Features />
                <Testimonials />
                <Pricing />
                <CallToAction />
                <Footer />
        </NextThemesProvider>
    )
}