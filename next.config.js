const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME
const MINIO_ENDPOINT =
  process.env.NEXT_PUBLIC_MINIO_ENDPOINT || process.env.MINIO_PUBLIC_ENDPOINT

const parseHost = (value) => {
  if (!value) return null
  const raw = value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`
  try {
    const url = new URL(raw)
    return { hostname: url.hostname, port: url.port || undefined }
  } catch {
    return null
  }
}

const minioHost = parseHost(MINIO_ENDPOINT)

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
      ...(minioHost
        ? [
            {
              protocol: "https",
              hostname: minioHost.hostname,
              ...(minioHost.port
                ? { port: minioHost.port }
                : {}),
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig
