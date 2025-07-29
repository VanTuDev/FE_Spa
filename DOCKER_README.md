# 🐳 Docker Setup cho YUMI SPA Frontend

## 📋 Tổng quan

Dự án YUMI SPA Frontend được containerized với Docker để đảm bảo tính nhất quán và dễ dàng triển khai.

## 🚀 Cách chạy nhanh

### Sử dụng script tự động:
```bash
chmod +x build-and-run.sh
./build-and-run.sh
```

### Sử dụng Docker Compose:
```bash
# Build và chạy
docker-compose up --build

# Chạy ở background
docker-compose up -d --build

# Dừng ứng dụng
docker-compose down
```

### Sử dụng Docker trực tiếp:
```bash
# Build image
docker build -t yumi-spa-frontend .

# Chạy container
docker run -d -p 3000:80 --name yumi-spa yumi-spa-frontend
```

## 🔧 Cấu hình

### Ports
- **Host**: 3000
- **Container**: 80

### Environment Variables
- `NODE_ENV=production`

## 📊 Monitoring

### Health Check
Container có health check tự động kiểm tra mỗi 30 giây:
```bash
# Kiểm tra health status
docker-compose ps
```

### Logs
```bash
# Xem logs real-time
docker-compose logs -f spa-app

# Xem logs của tất cả services
docker-compose logs -f
```

## 🛠️ Troubleshooting

### Container không start
```bash
# Kiểm tra logs
docker-compose logs spa-app

# Restart container
docker-compose restart spa-app
```

### Port conflict
Nếu port 3000 đã được sử dụng, thay đổi trong `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Thay 3000 thành 8080
```

### Build cache issues
```bash
# Build lại từ đầu
docker-compose build --no-cache
```

## 🔒 Security Features

- ✅ Non-root user (nginx)
- ✅ Security headers
- ✅ Hidden files protection
- ✅ Gzip compression
- ✅ Static asset caching

## 📈 Performance Optimizations

- ✅ Multi-stage build
- ✅ Alpine Linux (nhẹ)
- ✅ Nginx caching
- ✅ Gzip compression
- ✅ Docker layer caching

## 🏗️ Build Process

1. **Stage 1 (Builder)**:
   - Node.js 20 Alpine
   - Install dependencies
   - Build application

2. **Stage 2 (Production)**:
   - Nginx Alpine
   - Copy built files
   - Configure nginx
   - Set permissions

## 📁 File Structure

```
├── Dockerfile          # Docker build configuration
├── docker-compose.yml  # Multi-service orchestration
├── nginx.conf         # Nginx server configuration
├── .dockerignore      # Files to exclude from build
├── build-and-run.sh   # Automated build script
└── DOCKER_README.md   # This file
```

## 🌐 Access

Sau khi chạy thành công, truy cập:
- **Local**: http://localhost:3000
- **Network**: http://your-ip:3000

## 📝 Commands Reference

```bash
# Build
docker-compose build

# Run
docker-compose up

# Run in background
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Remove everything
docker-compose down -v --remove-orphans
``` 