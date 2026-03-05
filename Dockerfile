# משתמשים בגרסת Node יציבה
FROM node:18-alpine
# קובעים את תיקיית העבודה
WORKDIR /app
# מעתיקים קודם רק את קבצי החבילות (לניצול זיכרון מטמון/Cache של דוקר)
COPY package*.json ./
# התקנת התלויות
RUN npm install
# העתקת כל שאר הפרויקט
COPY . .
# חשיפת הפורט שביקשת
EXPOSE 3003
# הגדרת משתנה סביבה כדי ש-React ירוץ על הפורט הזה
ENV PORT=3003
# הרצת האפליקציה
CMD ["npm", "start"]