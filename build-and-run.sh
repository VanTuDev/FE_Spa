#!/bin/bash

# Script để build và chạy YUMI SPA Frontend
echo "🚀 Bắt đầu build và chạy YUMI SPA Frontend..."

# Kiểm tra Docker có được cài đặt không
if ! command -v docker &> /dev/null; then
   echo "❌ Docker chưa được cài đặt. Vui lòng cài đặt Docker trước."
   exit 1
fi

# Kiểm tra Docker Compose có được cài đặt không
if ! command -v docker-compose &> /dev/null; then
   echo "❌ Docker Compose chưa được cài đặt. Vui lòng cài đặt Docker Compose trước."
   exit 1
fi

# Dừng và xóa container cũ nếu có
echo "🧹 Dọn dẹp container cũ..."
docker-compose down --remove-orphans

# Build image
echo "🔨 Đang build Docker image..."
docker-compose build --no-cache

# Chạy container
echo "🚀 Đang khởi động ứng dụng..."
docker-compose up -d

# Kiểm tra trạng thái
echo "⏳ Đang kiểm tra trạng thái container..."
sleep 10

# Kiểm tra health check
if docker-compose ps | grep -q "healthy"; then
   echo "✅ Ứng dụng đã chạy thành công!"
   echo "🌐 Truy cập: http://localhost:3000"
   echo ""
   echo "📊 Trạng thái container:"
   docker-compose ps
else
   echo "⚠️  Ứng dụng đang khởi động..."
   echo "🌐 Truy cập: http://localhost:3000"
   echo ""
   echo "📊 Trạng thái container:"
   docker-compose ps
fi

echo ""
echo "📝 Các lệnh hữu ích:"
echo "  - Xem logs: docker-compose logs -f spa-app"
echo "  - Dừng ứng dụng: docker-compose down"
echo "  - Restart: docker-compose restart spa-app" 