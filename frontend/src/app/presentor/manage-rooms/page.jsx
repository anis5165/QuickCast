'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Presentation, Users, Lock, Unlock, Plus, Search, RefreshCw, Trash2, Check, X, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Presenter() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchRooms();
  }, []);

  const checkAuthAndFetchRooms = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guest/presenter`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const roomsData = Array.isArray(response.data) ? response.data : [];
      setRooms(roomsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('Failed to fetch rooms. Please try again later.');
      setLoading(false);
      setRooms([]);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('presenter');
        router.push('/login');
      }
    }
  };

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      if (!newRoomName.trim()) {
        setError('Room name is required');
        return;
      }

      setLoading(true);
      const token = localStorage.getItem('authToken');

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/guest/create`, 
        { 
          name: newRoomName,
          isPrivate: isPrivate,
          password: roomPassword
        },
        { 
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRooms(prevRooms => [...prevRooms, response.data]);
      setNewRoomName('');
      setRoomPassword('');
      setIsPrivate(false);
      setError('');
      setSuccess(`Room "${response.data.name}" created successfully!`);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  const enterRoom = (roomCode) => {
    try {
      router.push(`/guest/${roomCode}`);
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to enter room');
    }
  };

  const initiateDelete = (roomCode) => {
    setShowConfirmDelete(roomCode);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };

  const confirmDelete = async (roomCode) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/guest/${roomCode}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(prevRooms => prevRooms.filter(room => room.code !== roomCode));
      setSuccess('Room deleted successfully');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete room');
    } finally {
      setShowConfirmDelete(null);
      setLoading(false);
    }
  };

  const handleCopyRoomCode = (code) => {
    navigator.clipboard.writeText(code);
    setSuccess('Room code copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const filteredRooms = Array.isArray(rooms) ? rooms.filter(room => 
    room &&
    ((room.name && room.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (room.code && room.code.toLowerCase().includes(searchTerm.toLowerCase())))
  ) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
            Presenter Dashboard
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Presentations
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create and manage your presentation rooms, engage with your audience, and deliver amazing presentations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <X className="h-5 w-5 mr-2" />
                {error}
              </div>
              <button onClick={() => setError('')} className="text-red-700 hover:text-red-900">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                {success}
              </div>
              <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Create Room Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Plus className="h-6 w-6 mr-2 text-purple-600" />
                  Create New Room
                </CardTitle>
                <CardDescription>
                  Set up a new presentation room to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={createRoom} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Name
                    </label>
                    <input
                      type="text"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter room name"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-purple-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">Make Room Private</span>
                    </label>

                    {isPrivate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Room Password
                        </label>
                        <input
                          type="password"
                          value={roomPassword}
                          onChange={(e) => setRoomPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Create password"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating...' : 'Create Room'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Rooms List */}
            <div className="md:col-span-2">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                        <Presentation className="h-6 w-6 mr-2 text-purple-600" />
                        Your Rooms ({rooms.length})
                      </CardTitle>
                      <CardDescription>
                        Manage your presentation rooms and access settings
                      </CardDescription>
                    </div>
                    <div className="w-full md:w-auto flex gap-2">
                      <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search rooms..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <Button
                        onClick={checkAuthAndFetchRooms}
                        variant="outline"
                        className="px-4 py-2"
                      >
                        <RefreshCw className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {rooms.length === 0 ? (
                    <div className="text-center py-12">
                      <Presentation className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms created yet</h3>
                      <p className="text-gray-600">Create your first room to get started!</p>
                    </div>
                  ) : filteredRooms.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
                      <p className="text-gray-600">Try adjusting your search terms</p>
                      <Button
                        onClick={() => setSearchTerm('')}
                        variant="link"
                        className="mt-2 text-purple-600"
                      >
                        Clear search
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredRooms.map(room => (
                        <motion.div
                          key={room._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {room.code}
                                </Badge>
                                <button
                                  onClick={() => handleCopyRoomCode(room.code)}
                                  className="text-gray-500 hover:text-purple-600 transition-colors"
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                                {room.isPrivate ? (
                                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                                    <Lock className="h-3 w-3 mr-1" />
                                    Private
                                  </Badge>
                                ) : (
                                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    <Unlock className="h-3 w-3 mr-1" />
                                    Public
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {showConfirmDelete === room.code ? (
                                <>
                                  <Button
                                    onClick={() => confirmDelete(room.code)}
                                    variant="destructive"
                                    size="sm"
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Confirm
                                  </Button>
                                  <Button
                                    onClick={cancelDelete}
                                    variant="outline"
                                    size="sm"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    onClick={() => enterRoom(room.code)}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                  >
                                    Enter Room
                                  </Button>
                                  <Button
                                    onClick={() => initiateDelete(room.code)}
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-red-600"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}