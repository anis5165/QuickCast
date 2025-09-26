"use client";
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { AnimatedContainer, AnimatedItem, fadeInUpVariants } from "@/animations/PageTransation.jsx";
import { Presentation, Users, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Head>
        <title>About - QuickCast</title>
        <meta name="description" content="About QuickCast - Revolutionizing the presentation experience" />
      </Head>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
            Our Story
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            About
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              QuickCast
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform how people present and engage with their audience. 
            QuickCast brings real-time interaction and engagement to presentations.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What drives us to create the best presentation platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Presentation className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Constantly pushing boundaries to create better presentation experiences
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">User-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Everything we build is designed with our users' needs in mind
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Building a platform you can trust for your important presentations
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Presentations?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of presenters who have made their presentations more engaging with QuickCast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button href={() => checkToken()} size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-lg px-8 py-3 text-lg font-semibold">
              Start Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
