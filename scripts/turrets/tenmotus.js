const statuses = require("libs/statuses");

const cryoexplosion = new Effect(45, e => {
    Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
    Angles.randLenVectors(e.id, 25, e.finpow() * 75, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
});

const cryoShot = new Effect(45, e => {
    Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
    Angles.randLenVectors(e.id, 15, e.finpow() * 5, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
  })
});

const cryoTrail = new Effect(15, e => {
    Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
    Angles.randLenVectors(e.id, 1, e.finpow() * 3, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
  })
});

const magTrail = new Effect(5, e => {
    Draw.color(Color.white, Color.valueOf("c0c2d3"), e.fin());
    Angles.randLenVectors(e.id, 1, e.finpow() * 3, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
  })
});

const shadowWave = new Effect(50, e => {
    Draw.color(Color.black, Color.black, e.fout());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
});

const darknessTrail = new Effect(15, e => {
    Draw.color(Color.black, Pal.darkMetal, e.fin());
    Angles.randLenVectors(e.id, 1, e.finpow() * 3, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
  })
});

const shadowShot = new Effect(15, e => {
    Draw.color(Color.black, Color.black, e.fin());
    Angles.randLenVectors(e.id, 5, e.finpow() * 8, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
  })
});

const cryoDrops = extend(LiquidBulletType, {});
cryoDrops.liquid = Liquids.cryofluid;
cryoDrops.lifetime = 10;
cryoDrops.fragBullet = Bullets.standardCopper;

const freezingShot = extend(PointBulletType, {
    speed: 32,
    lifeimte: 20,
    splashDamage: 90,
    splashDamageRadius: 35,
    fragBullet: cryoDrops,
    fragBullets: 12,
    hitEffect: cryoexplosion,
    trailEffect: cryoTrail,
    shootEffect: cryoShot,
    trailSpacing: 2,
    collides: true,
    collidesAir: true,
    collidesGround: true,
});

const magnetineFrag = extend(BasicBulletType, {
	damage: 5,
	splashDamage: 5,
	splashDamageRadius: 20,
	lifetime: 100,
	drag: 0.025,
	shrinkY: 1,
	homingRange: 100,
	homingPower: 10
});
magnetineFrag.frontColor = Color.valueOf("ffffff");
magnetineFrag.backColor = Color.valueOf("ffffff");
magnetineFrag.hitEffect = Fx.none;
magnetineFrag.despawnEffect = Fx.none;

const fragShot = extend(PointBulletType, {
	speed: 32,
	damage: 10,
    ammoMultiplier: 10,
    reloadMultiplier: 20,
	lifetime: 20,
    fragBullet: magnetineFrag,
	fragBullets: 15,
    trailEffect: magTrail,
    trailSpacing: 2,
	collides: true,
	collidesAir: true,
	collidesTiles: true
});
fragShot.frontColor = Color.valueOf("ffffff");
fragShot.backColor = Color.valueOf("ffffff");
fragShot.shootEffect = Fx.shootSmall;
fragShot.hitEffect = Fx.hitBulletBig;
fragShot.despawnEffect = Fx.none;

const placeholdert = extend(BasicBulletType, {
    lifeimte: 0,
    speed: 0
});

const blackoutShot = extend(PointBulletType, {
    speed: 32,
    lifeimte: 20,
    splashDamage: 90,
    splashDamageRadius: 35,
    fragBullet: placeholdert,
    hitEffect: shadowWave,
    trailEffect: darknessTrail,
    shootEffect: shadowShot,
    trailSpacing: 2,
    collides: true,
    collidesAir: true,
    collidesGround: true,
});
blackoutShot.status = statuses.blackout;
blackoutShot.statusDuration = 3600;

const railgun3 = extendContent(ItemTurret, "railgun3", {
    init() {
    this.ammo(
        Vars.content.getByName(ContentType.item,"titanium"), freezingShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-magnitine"), fragShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-feromagnet"), blackoutShot
    );
    this.super$init();
  }
});
//Thanks for the help with effects Puppycat :)