# Soutas Import Agencies Website

This is the official website for Soutas Import Agencies, a company that imports and distributes high-quality batteries and lubricants.

## Description

The website provides information about the company, its products, and its suppliers. It also includes a contact form for inquiries.

The website is built with HTML, CSS, and JavaScript, and it uses the Bootstrap framework for styling.

## Features

- Company profile and information
- List of suppliers and products
- Contact form
- Responsive design for mobile and desktop devices

## QR Code Product Lookup

The `qr` directory contains a product lookup page that is designed to be accessed by scanning a QR code. This page allows users to quickly find information about a specific product. It is not indexed by search engines.

## How to Update the database

1. Go to `/home/nassoskranidiotis/Documents/OfficeAdmin/QR Codes` locally.
2. Run `populate_db.py` and update `products.db`.
3. Copy the updated `products.db` into the `qr` folder. 

No special build steps are required. The website is static and can be served from any web server.
