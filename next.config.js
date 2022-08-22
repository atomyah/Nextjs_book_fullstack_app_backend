/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  //↓ cloudinaryに画像をアップしそのURLを<Image>のsrcで指定できるようにするための指定
  images: {
    domains: ["res.cloudinary.com"]
  }

}

module.exports = nextConfig
