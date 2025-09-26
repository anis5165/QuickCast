"use client";
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { AnimatedContainer, fadeInUpVariants } from "@/animations/PageTransation";
import { Presentation, Share2, Users, Zap, Lock, BarChart, MessageSquare, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Footer from '@/components/Footer';

const FeaturesPage = () => {
  const coreFeatures = [
    {
      icon: <Presentation className="h-6 w-6" />,
      title: "Real-time Presentations",
      description: "Deliver engaging presentations with instant audience interaction and feedback."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Easy Sharing",
      description: "Share your presentations instantly with a unique code for seamless access."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Audience Engagement",
      description: "Keep your audience engaged with interactive features and real-time feedback."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Quick Setup",
      description: "Get started in minutes with our intuitive and user-friendly interface."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure Platform",
      description: "Your presentations and data are protected with enterprise-grade security."
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Track engagement and gather insights with comprehensive analytics."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Enable real-time communication between presenters and audience."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Session Recording",
      description: "Record your presentations for future reference and sharing."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Head>
        <title>Features - QuickCast</title>
        <meta name="description" content="Explore the powerful features of QuickCast - the ultimate realtime presentation platform" />
      </Head>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
            Features
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Modern Presentations
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how QuickCast transforms your presentation experience with cutting-edge features
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to deliver engaging and interactive presentations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your presentation experience with our advanced features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 text-pink-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
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
};

export default FeaturesPage;