# Docker Commands for Google Form Page

## Build and Run

```bash
# Build and start the application
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild only
docker-compose build --no-cache
```

## Development Commands

```bash
# Build the Docker image manually
docker build -t googleformpage .

# Run container manually with SSL
docker run -p 10020:80 -p 10443:443 -v /appigo/ssl:/etc/nginx/ssl:ro googleformpage

# Check running containers
docker ps

# Access container shell
docker exec -it googleformpage-app sh
```

## Access the Application

- **HTTPS URL**: https://uocalumni.appigo.co:10443 (Primary)
- **HTTP URL**: http://uocalumni.appigo.co:10020 (Redirects to HTTPS)
- **Health Check**: https://uocalumni.appigo.co:10443/health

## SSL Certificate Verification

```bash
# Test SSL certificate
openssl s_client -connect uocalumni.appigo.co:10443 -servername uocalumni.appigo.co

# Check certificate details
curl -vI https://uocalumni.appigo.co:10443
```

## Troubleshooting

```bash
# Check container logs
docker logs googleformpage-app

# Check SSL certificate files in container
docker exec -it googleformpage-app ls -la /etc/nginx/ssl/

# Test nginx configuration
docker exec -it googleformpage-app nginx -t

# Remove all containers and images
docker-compose down --rmi all

# Clean Docker system
docker system prune -a
```
```

## Key SSL Configuration Features:

✅ **Certificate Setup**: Uses your wildcard certificate `star_appigo_co.crt` for `*.appigo.co`  
✅ **HTTP to HTTPS Redirect**: All HTTP traffic redirects to HTTPS  
✅ **Security Headers**: Includes HSTS and other security headers  
✅ **Modern SSL**: Uses TLS 1.2/1.3 with secure cipher suites  
✅ **Domain Configuration**: Configured for `uocalumni.appigo.co`  
✅ **Port Mapping**: HTTP on 10020, HTTPS on 10443  

## To Deploy:

```bash
# Ensure SSL certificates exist
ls -la /appigo/ssl/

# Build and run with SSL
docker-compose up -d --build
```

Your application will be available at:
- **https://uocalumni.appigo.co:10443** (secure)
- **http://uocalumni.appigo.co:10020** (redirects to HTTPS)