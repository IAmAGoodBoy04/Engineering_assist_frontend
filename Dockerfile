# Use the official Nginx image as a base
FROM nginx:alpine

# Copy the contents of the current directory to /usr/share/nginx/html
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]