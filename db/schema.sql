DROP DATABASE IF EXISTS blog_db;
CREATE DATABASE blog_db;

Select p.id, p.title, p.date_created, p.post_text, u.user_name, c.comment_text, c.date_created, uc.user_name
FROM post p 
join user u on p.user_id=u.id
join comment c on p.id = c.post_id 
join user uc on c.user_id=uc.id;