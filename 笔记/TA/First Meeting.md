# First Meeting

## Brief Sketch
There are 6 tasks, 3 for individuals, start with S, and 3 team milestones, start with M
Although S takes less score, it is actually the base of corresponding M tasks, so take care.

## Meetings Schedule & My Responsibility
It is a shame that we just have 8 TAs this year, but the number of teams is around 80. Which means that each of TA need to be response for 10 teams. It's a big work loads.
Each of team need to have 15-20mins meeting with TA each month.
The usual practice in previous years was to have 2 meetings a week, 1 with TA, 1 not.
Highly recommend you guys to use Zoom meetings with me, on the one hand it's because the high work loads, on the other hand, I have a tool chine to help me organize and summarize your meetings and problem, so that I can help you guys ask the Module Leader.
For each week you guys will receive a poll to decide which time slot you guys want to have meetings with me.
My responsibility is to solve 你们的一些非技术性问题，包括选题，告诉你们接下来怎么做，给一些建议，帮你们反馈问题，帮你们拿高分。For the technical problems, you guys could go to the lab session and ask lab demostrators.

## S1 intro
Preliminary: Get a topic. All of you guys agree. If not, let me know.
Each of you response for at least 1 entity.
My topic is, we build a rating website for Spotify, you can login with your spotify account, leave your ratings and comments on all of the spotify songs, and we can sync the likes and folders on spotify. Last year we seperate features, not entity. but I still show you guys how we seperate
**Discovery pages**
**Ratings and reviews pages for each song and album**
favorite list
Leaderboards
**Profile pages**
**Recently listened slide bar**
https://docs.google.com/document/d/1cBI8kI-NNFkphKcexTC1nsdDrAc0k9JmcLhz6l5HUv4/edit?tab=t.0#heading=h.xk4vuhvjs3ra

Some important rating point:
1. your website should be sophisticated. could read & write. if can just read, lower score.
2. recommend to build your own api. like the leaderboard api.
3. It's ok to use 3rd party api, but it must be FREE
4. for M2, it's not recommend to use the jhipster default page. write some front end could!


DDL Week 3 （limited time） 04/02/2025
![](assets/Pasted%20image%2020250120222232.webp)
1. git commit, dev env setup
	1. for git, you guys will have some masterclass in week2, teach you guys how to use git and github
	2. for env setup, it's very lucky that you guys have VM this year, which means that you actually don't need do anything except for install the VM
2. Entity and JDL
	1. Entity, you guys have already learnt in Software Engineering. It's abstraction of real things, like if you want to mimic vending machine in your object oriented programming language, you have at least 2 entities, one is the vending machine itself, and another is Commodities in it, like drinks ,snacks and so on. For the vending machine, it has some attributes like inventory and balance, 制造时间等等, and for the commodities in it, it has attributes like name, 生产日期，价格，过期时间等等。And for this example, the relationship of vending machine and Commodities is 多对多，which means that a vending machines can sell different kinds of commodities, and on commodities can be sold by different vending machines.
	2. JDL, JHipster Domain Language, you use this language to describe the entity and relationship
```java
entity VendingMachine {
  id Long,
  name String required,             // 售货机名称
  inventory Integer,                // 库存数量
  balance BigDecimal,               // 余额
  manufactureDate Instant           // 制造时间
}

entity Commodity {
  id Long,
  name String required,             // 商品名称
  category String,                  // 商品类别（饮料、零食等）
  price BigDecimal required,        
  manufactureDate Instant,          
  expirationDate Instant            
}

relationship ManyToMany {
  VendingMachine{commodities} to Commodity{vendingMachines}
}

dto VendingMachine, Commodity with mapstruct
service VendingMachine, Commodity with serviceClass
paginate Commodity with pagination
```

3. Mockup pages for the entity
	1. one entity could have more than 1 pages.
	2. highly recommend you guys to unify design style, which is helpful for M1
	3. Use the tool on the class, don't use SLIDES.
4. kanban
	1. you can use whatever tools you want at least it's kanban
	2. at least 3 columns. undo, doing, done
	3. for each card, title, ddl, description, attendee.
	4. at least 1 for each team member
5. unassessed
	1. teamwork policy proposal: I don't know what that is
	2. tech stack change proposal: You can change, but don't recommend to.
		1. CI/CD pipeline is hard to build on your own, at least time wasting
		2. The school resources is about the default tech stack. You change, you need to learn and solve problems on your own.
		3. 去年的统计，更改tech stack 的分都不高
		4. springboot is heavy, angular is unpopular, but actually enough to complete the TP.
		5. time sheets and meeting diary: do it! Last year is mandatory. Madesur was quite conflicted when discussing the time sheets and diary with us.
