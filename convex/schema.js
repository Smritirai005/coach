


import { defineSchema } from "convex/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        credits:v.number(),
        subscriptionId:v.optional(v.string()),
    })
})