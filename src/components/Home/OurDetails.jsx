import React, { useEffect, useState } from 'react';
import { MdAccessTime } from 'react-icons/md';
import { FaBus, FaRoute } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi';
import { fetchMetaSummary } from '../../services/busService';

const defaultStats = [
  {
    key: 'heritage',
    icon: <MdAccessTime className="w-8 h-8" />,
    value: '30+',
    label: 'Years of Heritage',
    description: 'Over three decades of trust and reliability on the road.',
  },
  {
    key: 'routes',
    icon: <FaBus className="w-8 h-8" />,
    value: '0',
    label: 'Active Routes',
    description: 'Live inventory sourced directly from our operations center.',
  },
  {
    key: 'bookings',
    icon: <HiOutlineUsers className="w-8 h-8" />,
    value: '0',
    label: 'Bookings Confirmed',
    description: 'Passengers who started journeys with us this season.',
  },
  {
    key: 'destinations',
    icon: <FaRoute className="w-8 h-8" />,
    value: '0',
    label: 'Top Destinations',
    description: 'Trending cities booked in the past 30 days.',
  },
];

const OurDetails = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    fetchMetaSummary()
      .then(summary => {
        setStats(prev => prev.map(item => {
          if (item.key === 'routes' && summary.routes !== undefined) {
            return { ...item, value: `${summary.routes}+` };
          }
          if (item.key === 'bookings' && summary.bookings !== undefined) {
            return { ...item, value: `${summary.bookings}+` };
          }
          if (item.key === 'destinations' && Array.isArray(summary.topDestinations)) {
            return { ...item, value: `${summary.topDestinations.length}` };
          }
          return item;
        }));
      })
      .catch(() => {
        // Silent fail keeps default values in place
      });
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 px-4 md:px-10 lg:px-20">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-2 block">
              Stats & Milestones
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              The Journey of Raj <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-600"> Mudra</span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              We aren't just moving people we're moving stories. Our commitment to excellence
              is reflected in every mile we cover.
            </p>
          </div>
          <div className="hidden lg:block h-1 w-32 bg-orange-200 mb-4 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(item => (
            <div
              key={item.key}
              className="group relative bg-white border border-slate-100 p-8 rounded-4xl shadow-sm hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-500 hover:-translate-y-3"
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {item.value}
                </h3>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  {item.label}
                </p>
                <div className="w-10 h-1 bg-orange-400 rounded-full transform origin-left transition-all duration-500 group-hover:w-full" />
                <p className="pt-2 text-slate-500 text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurDetails;