'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      console.log('Contact form submission:', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
            Get in Touch
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Contact
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions about our realtime presentation system? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">Contact Information</CardTitle>
              <CardDescription className="text-gray-600">
                Reach out to us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  icon: <EnvelopeIcon className="h-6 w-6 text-purple-600" />,
                  title: 'Email',
                  text: 'support@quickcast.com',
                },
                {
                  icon: <PhoneIcon className="h-6 w-6 text-purple-600" />,
                  title: 'Phone',
                  text: '+1 (555) 123-4567',
                },
                {
                  icon: <MapPinIcon className="h-6 w-6 text-purple-600" />,
                  title: 'Address',
                  text: '123 Innovation Way\nTech District, San Francisco, CA 94103',
                },
                {
                  icon: <ClockIcon className="h-6 w-6 text-purple-600" />,
                  title: 'Business Hours',
                  text: 'Monday - Friday: 9 AM - 6 PM\nSaturday & Sunday: Closed',
                },
              ].map(({ icon, title, text }, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start space-x-4 p-4 rounded-lg transition duration-300 hover:bg-purple-50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{text}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">Send us a Message</CardTitle>
              <CardDescription className="text-gray-600">
                Fill out the form below and we'll get back to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field) => (
                  <motion.div
                    key={field}
                    whileHover={{ scale: 1.01 }}
                  >
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {field === 'name'
                        ? 'Your Name'
                        : field === 'email'
                          ? 'Email Address'
                          : 'Subject'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      required
                    />
                  </motion.div>
                ))}

                <motion.div whileHover={{ scale: 1.01 }}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  ></textarea>
                </motion.div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg"
                  >
                    Thank you for your message! We'll get back to you soon.
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

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
