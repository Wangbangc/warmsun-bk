
tcp 代理

```nginx
stream {
    server {
        listen 1883;
        proxy_pass tb-node:1883;
        
        proxy_connect_timeout 10s;
    	proxy_timeout 65s;
    }
}

```


大请求体, 大请求头, gzip, https, websocket

```nginx
client_max_body_size 1G;
large_client_header_buffers 4 16k;

gzip on;
gzip_min_length 1k;
gzip_vary on;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/html text/css text/javascript application/javascript application/json text/xml application/xml application/xml+rss image/svg+xml application/font-sfnt;

server {
    listen 80;
    server_name git.apihub.net;
    if ($http_user_agent ~* "bot|facebook") {
        return 403;
    }
    location /robots.txt {
        return 200 'User-agent: *\nDisallow: /';
    }
    location / {
        proxy_pass http://10.168.1.100:8418;
        
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 443;
        proxy_redirect http:// https://;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```