addLayer("e", {
    name: "Embers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#e09112",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Embers", // Name of prestige currency
    baseResource: "Sparks", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        if(hasUpgrade(this.layer,23)) mult = mult.div(upgradeEffect('e', 23))
        if(hasUpgrade(this.layer,33)) mult = mult.div(upgradeEffect('e', 33))

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for embers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "A single match.",
            description: "Double Spark gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "A smoldering cigarette.",
            description: "Triple Spark gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "A small campfire.",
            description: "Quadruple Spark gain.",
            cost: new Decimal(5),
        },
        21: {
            title: "An open candle.",
            description: "Multiply Spark gain based on Embers.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('e',13)},
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "A dropped lighter.",
            description: "Multiply Spark gain based on Sparks.",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('e',13)},
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "A firework gone askew.",
            description: "Divide Ember requirements based on Sparks.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade('e',13)},
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) },
        },
        31: {
            title: "Lightning strike on a dry tree.",
            description: "A stronger version of 'An open candle.'.",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade('e',23)},
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        32: {
            title: "Like an ant under a magnifying glass.",
            description: "A stronger version of 'A dropped lighter.'.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade('e',23)},
            effect() {
                return player.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        33: {
            title: "A young arsonist.",
            description: "A stronger version of 'A firework gone askew.'.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade('e',23)},
            effect() {
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) },
        },
        41: {
            title: "They begin to spread.",
            description: "Unlock the Flames layer and Ember Milestones.",
            cost: new Decimal(150),
        },
    },
    milestones: {
        0: {
            requirementDescription: "500 Embers",
            effectDescription: "They are left untreated. Gain a massive multiplier to spark gain based on Embers.",
            done() { return player.e.points.gte(500) },
            unlocked() { return hasUpgrade(this.layer,41) },
        },
    },
    layerShown(){return true}
})
