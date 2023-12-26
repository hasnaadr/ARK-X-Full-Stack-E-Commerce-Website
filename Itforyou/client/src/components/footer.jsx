import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">IT-Maroc Services</h2>
            <p className="text-sm mt-2">Your Trusted IT Solutions Partner</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul className="text-sm">
                <li><a href="/home">Home</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Services</h3>
              <ul className="text-sm">
                <li><a href="/web-development">Web Development</a></li>
                <li><a href="/app-development">App Development</a></li>
                <li><a href="/networking">Networking</a></li>
                <li><a href="/security">Security Solutions</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} IT-Maroc Services. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm">Contact us: contact@itmarocservices.com</p>
            <div className="flex items-center gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-2xl" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-2xl" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-2xl" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-2xl" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
