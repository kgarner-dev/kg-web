---
title: "Avoid Developer Tunnel Vision"
slug: "tunnel-vision"
date: "2025-02-03"
tags: [blog, career]
preview_image: /images/tunnel-vision.webp
summary: "Have you ever solves a problem so thoroughly that you created three new problems in the process? That is Developer Tunnel Vision, and it's more common than most devlopers would admit. I share a story from early in my career that taught me how hyper-focusing on one dimension of a problem can blind you from the health of the entire system, and how you can start thinking in systems intead of just tickets."
links:
    devto: "https://dev.to/kgthedev/avoid-developer-tunnel-vision-548f"
---

Let me start with a story from early on in my career: I was building a homepage for a client, and instantly came up with an intricate design for their homepage. I was meeting with seniors on my team to come up with ideas, constantly shifting property values by decimals to try to get the effect I wanted, and spending countless hours researching.

Finally, I did it. It looked exactly how I envisioned it. I completed the rest of the site, submitted it, and happily moved on to the next site in the queue. But obviously, the story doesn't end there. After receiving an impromptu meeting scheduled with my manager and another senior on the team, and having to look back at that site I spent so much time working on… it looked horrible. I spent so much of my effort and time solving this one issue, and once that specific challenge was solved I didn't put in the same effort to the rest of the build.

After sharing that story, I have a question for you: **have you ever solved a problem, only for that solution to cause a problem for someone else?**

If you are a developer and you said yes (or even maybe)… I think there is a specific issue that we can address to minimize this occurrence. I like to call it **Developer Tunnel Vision**.

## What is Developer Tunnel Vision?

![Photo by KS KYUNG on Unsplash](https://images.unsplash.com/photo-1534590158618-73acb7d3641d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
*Photo by KS KYUNG on Unsplash*

So, what exactly is "**Developer Tunnel Vision**"?

Picture a magnifying glass focused on a very specific problem you are trying to solve. Your full focus is on that one issue, and once it is solved you remove the magnifying glass but your attention still remains on that singular focal point, and not on the rest of the solution.

This tunnel vision can personify in other ways as well:

- Fixating on a very complex solution when a simple solution would be better.
- Focusing on performance at the expense of maintainability
- Pushing a fix for a primary problem without ever introducing edge cases into the scope

All these instances share a common issue: focusing on a single aspect of the solution while causing problems for others who rely on it.

## What Does Tunnel Vision Look Like?

After laying out the definition, I don't think it would be very helpful to see what tunnel vision looks like from a developer's perspective. So, why don't we take a look at it from *other perspectives*?

- **Content Strategist**: After a seasonal promotion ends, they're unable to quickly update the banners due to hard coded content and rigid design, requiring developer intervention. This delays updates and leaves outdated content visible.

- **DevOps Engineer**: Hardcoded database credentials buried in multiple files make server migrations complex and clumsy, requiring manual edits or developer assistance.

- **Client**: A client that is excited about their new website is disappointed when their brand and concept is completely overlooked, but look… that rotator on the homepage looks really cool.

- **Future Developer**: A new dev diving into a codebase faces undocumented, complex functions, leading to more time spent deciphering code and not solving issues.

## Why Have a Bigger Perspective?

Now that we have laid out some other points of view around the issues that can arise from tunnel vision, I wanted to answer a bigger question: *why does it matter*?

A simple answer to a simple question: because having a bigger perspective *helps, drastically*. There are three main areas I want to hit on that are impacted by avoiding **Developer Tunnel Vision**.

- **Team Dynamics**: When you get a wider perspective that includes others into the scope, the dynamics between the teams open like a flood gate. People are able to easily and simply do their job without hiccups or roadblocks.

- **Efficiency**: The bigger perspective saves you a substantial amount of time and effort in the long run by taking the extra steps to get a fully fledged solution that will need less tickets, commotion, and meetings in the future.

- **Scalability**: As organizations or products grow, code that is built with a wider perspective will be able to grow with them. Being able to add and adapt the code to fit ongoing needs is a huge help for the future.

## The Different Hats Developers Should Wear

![Photo by Good Free Photos on Unsplash](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tsdrbiivqvezidlfx11f.webp)
*Photo by Good Free Photos on Unsplash*

I think a fun way to think about and remember the areas that developers should be thinking about when building solutions is through the use of hats. I'm sure you've heard the term "wear many hats", but let's take a look at the hats that encompass who our solutions affect the most:

### The User Hat

The user is the most important thing your site is tailored for; so, one of the biggest things that we need to think about when this hat is on is how the user is going to interact with our solution:

- Is my solution intuitive and easily digestible by a non-technical user?
- Is my solution going to make the user's day easier when they visit the site?
- When building the solution, were the user's needs kept in mind?

### The Client Hat

Another person who has a lot of stake in your solutions is your client. This person has invested resources for you to be able to solve a problem for them, so there are a couple of thoughts that are involved with this hat:

- Does my solution exemplify the vision and goals of the client?
- In my work, am I correctly proportioning my time and effort to fit all of the client's needs?
- Am I keeping a mental tab of what the client wants in my head when I am building this solution?

### The Team Hat

Another big area of focus that we need to keep in mind is our team. The people on our team are going to be working very closely with the solutions we built, so they also need to be kept in mind when we build too:

- Does this solution make anyone else's job on my team harder?
- Does the problem I am solving involve processes that other teams and roles will need?
- Does the solution aid the flow throughout the organization, or is it going against the grain?

### The Future Hat

The last hat, and the one that can be easily overlooked at times, is the future hat. This is that hat that makes us think of what our solution will look like in the future:

- Does the solution enable scalability if there is an increased need for the service?
- Would your solution be hard to maintain by a dev who may work on it later on?
- Would the team need to account for your solution to make a shift happen on the platform?

All of these hats can be extremely helpful to wear while we are working on projects because it will put us in the right mindset to not only solve specific problems, but to make a better overarching solution that raises up the quality of the product for those around us.

## So, What Now?

Now that we see that our code spans a lot further than just solving a singular problem, what steps can we take now to avoid Developer Tunnel Vision?

One key step is to **put on the hats**, make a conscious effort to put yourself in other people's shoes and make sure your code is going to elevate them and not hinder them. Don't be afraid to take the extra steps to make the jobs easier for everyone going forward.

Outside of your perspective, you can avoid falling into the trap of tunnel vision by:

- **Collaborating with others early and often**: Share ideas, lay out a good foundation for the project, and understand others' point of view.

- **Document fully and thoroughly**: Write out your thought process, document your approach, and add relevant comments in the code to help break down your solution.

- **Maintain a standard in your code**: Utilize a standardized approach when building your solutions, through modular and reusable architecture, naming conventions, and proper version control to make sure your solutions have uniformity.

By making the extra effort to produce a well-rounded solution, you are building an environment that allows for a fluid workflow, elevation of the team and people involved, and security around a solid foundation.

Developer tunnel vision can be easy to fall into, but these are just a couple of steps you can take to avoid this pitfall. Start asking yourself: **who else will this solution impact?** When you build with that mindset, you are creating a better user experience, building a better team dynamic, and creating a solid foundation for your applications. Next time you sit down to code, *put on all of the hats*.
