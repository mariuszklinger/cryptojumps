FROM node:11 as react-build
WORKDIR /app/fe
COPY . ./
RUN npm install
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/fe/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]