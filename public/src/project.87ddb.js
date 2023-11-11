window.__require = function t(e, i, n) {
    function o(s, a) {
        if (!i[s]) {
            if (!e[s]) {
                var h = s.split("/");
                if (h = h[h.length - 1], !e[h]) { var r = "function" == typeof __require && __require; if (!a && r) return r(h, !0); if (c) return c(h, !0); throw new Error("Cannot find module '" + s + "'") }
                s = h
            }
            var d = i[s] = { exports: {} };
            e[s][0].call(d.exports, function(t) { return o(e[s][1][t] || t) }, d, d.exports, t, e, i, n)
        }
        return i[s].exports
    }
    for (var c = "function" == typeof __require && __require, s = 0; s < n.length; s++) o(n[s]);
    return o
}({
    "3Cay_cuoc": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c89d4XDpzdPUKGADHNe7YYg", "3Cay_cuoc");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { nodeC: cc.Node, touch: cc.Node, mask: cc.Node, labelBet: cc.Label, labelMin: cc.Label, labelMax: cc.Label, min: "", max: "" },
            init: function(t) { this.betMin = t * this.min, this.betMax = t * this.max, this.h = this.betMin < 1e4 ? 10 : 100, this.labelMin.string = this.labelBet.string = n.numberWithCommas(this.betMin), this.labelMax.string = n.numberWithCommas(this.betMax), this.betMin = this.betMin / this.h, this.betMax = this.betMax / this.h },
            onEnable: function() { this.touch.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this) },
            onDisable: function() { this.touch.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.mask.width = 0, this.touch.position = cc.v2(0, 0), this.labelBet.string = n.numberWithCommas(this.betMin * this.h) },
            eventStart: function(t) { this.touch.runAction(cc.scaleTo(.1, .7)), this.offsetX = { localX: t.touch.getLocationX(), x: this.touch.position.x } },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.offsetX.localX + this.offsetX.x;
                e < 0 ? e = 0 : e > this.nodeC.width && (e = this.nodeC.width), this.mask.width = e, this.touch.position = cc.v2(e, 0);
                var i = e / this.nodeC.width * (this.betMax - this.betMin) + this.betMin >> 0;
                this.labelBet.string = n.numberWithCommas(i * this.h)
            },
            eventEnd: function() { this.touch.runAction(cc.scaleTo(.1, .6)) },
            onOkClick: function() { cc.RedT.send({ g: { bacay: { cuocC: n.getOnlyNumberInString(this.labelBet.string) } } }), this.node.active = !1 }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    "3Cay_player": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "689a4T0aQVJTah1s+xY8TPc", "3Cay_player");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { regOut: cc.Node, point: cc.Label, nickname: cc.Label, balans: cc.Label, ic_dealer: cc.Node, nodeDealer: cc.Node, betDealer: cc.Label, nodeChicken: cc.Node, betChicken: cc.Label, card: cc.Node, status: cc.Node, progress: cc.ProgressBar, avatar: cc.Sprite, isOpen: !1, isLat: !1 },
            onDisable: function() { this.ic_dealer.active = !1 },
            init: function() { this.item = this.card.children.map(function(t) { return t.defaultPosition = t.position, t.defaultAngle = t.angle, t.getComponent(cc.Sprite) }) },
            setAvatar: function(t) { t >>= 0, void 0 !== cc.RedT.avatars[t] ? this.avatar.spriteFrame = cc.RedT.avatars[t] : this.avatar.spriteFrame = cc.RedT.avatars[0] },
            ChiaBai: function(t, e, i) {
                var n = this.item[e],
                    o = cc.RedT.inGame;
                if (void 0 !== t.data) {
                    var c = t.data[e],
                        s = o.nodeCard.parent.convertToWorldSpaceAR(o.nodeCard.position);
                    n.node.position = n.node.parent.convertToNodeSpaceAR(s), n.node.scaleX = o.nodeCard.width / n.node.width, n.node.scaleY = o.nodeCard.height / n.node.height, n.node.angle = 3, n.node.active = !0, n.spriteFrame = cc.RedT.util.card.cardB1, n.node.runAction(cc.sequence(cc.delayTime(i), cc.spawn(cc.moveTo(.1, cc.v2()), cc.scaleTo(.1, 1)), cc.delayTime(1), cc.callFunc(function() { this.spriteFrame = cc.RedT.util.card.getCard(c.card, c.type), c = null }, n)))
                } else {
                    n.spriteFrame = cc.RedT.util.card.cardB1;
                    var a = o.nodeCard.parent.convertToWorldSpaceAR(o.nodeCard.position);
                    n.node.position = n.node.parent.convertToNodeSpaceAR(a), n.node.scaleX = o.nodeCard.width / n.node.width, n.node.scaleY = o.nodeCard.height / n.node.height, n.node.angle = 0, n.node.active = !0, n.node.runAction(cc.sequence(cc.delayTime(i), cc.spawn(cc.moveTo(.1, n.node.defaultPosition), cc.rotateTo(.1, n.node.defaultAngle), cc.scaleTo(.1, 1))))
                }
            },
            setInfo: function(t, e) {
                if (void 0 === e && (e = !1), t) {
                    if (this.node.active = !0, void 0 !== t.balans && (e ? this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() { this.balans.string = n.numberWithCommas(t.balans), t = null }, this))) : this.balans.string = n.numberWithCommas(t.balans), cc.RedT.inGame.mePlayer === this && (cc.RedT.user.red = t.balans)), t.name && (this.nickname.string = t.name), void 0 !== t.betChuong && (this.nodeDealer.active = !!t.betChuong, this.betDealer.string = n.numberWithCommas(t.betChuong)), void 0 !== t.betGa && (this.nodeChicken.active = !!t.betGa, this.betChicken.string = n.numberWithCommas(t.betGa)), t.isBetChuong && cc.RedT.inGame.mePlayer === this && 2 !== cc.RedT.inGame.game_round && (cc.RedT.inGame.nodeSelectGa.active = !0), void 0 !== t.bet) {
                        var i = t.bet >> 0;
                        i > 0 && this.noticeBet(i, "", 2, 25, cc.RedT.inGame.font1, !0)
                    }
                    if (void 0 !== t.totall) {
                        var o = t.totall >> 0;
                        o >= 0 ? this.noticeBet(o, "+", 3.5, 28, cc.RedT.inGame.font1) : this.noticeBet(Math.abs(o), "-", 3.5, 28, cc.RedT.inGame.font2)
                    }
                    void 0 !== t.openCard && this.openCard(t.openCard), void 0 !== t.setCard && this.setCard(t.setCard), void 0 !== t.avatar && this.setAvatar(t.avatar), void 0 !== t.progress && this.startProgress(t.progress), void 0 !== t.round && 1 == t.round && cc.RedT.inGame.mePlayer === this && (this.ic_dealer.active ? (cc.RedT.inGame.nodeSelectChuong.active = !1, cc.RedT.inGame.nodeSelectGa.active = !0) : (cc.RedT.inGame.nodeSelectChuong.active = !0, cc.RedT.inGame.nodeSelectGa.active = !1))
                } else this.resetGame(), this.node.active = !1
            },
            setCard: function(t) {
                console.log(t), this.item.forEach(function(e, i) {
                    var n = t[i];
                    e.node.active = !0, e.spriteFrame = cc.RedT.util.card.getCard(n.card, n.type)
                }.bind(this))
            },
            openCard: function(t) {
                this.isLat || (cc.RedT.inGame.mePlayer === this ? (cc.RedT.inGame.mePlayer.item.forEach(function(t) { t.node.runAction(cc.spawn(cc.moveTo(.1, t.node.defaultPosition), cc.rotateTo(.1, t.node.defaultAngle), cc.scaleTo(.1, 1))) }), cc.RedT.inGame.touchCard.forEach(function(t) { t.onDisable() })) : this.item.forEach(function(e, i) {
                    var n = t.card[i];
                    e.node.runAction(cc.sequence(cc.scaleTo(.1, 0, 1), cc.callFunc(function() { this.spriteFrame = cc.RedT.util.card.getCard(n.card, n.type) }, e), cc.scaleTo(.1, 1, 1), cc.callFunc(function() { this.point.node.active = !0, this.point.string = t.point }, this)))
                }.bind(this))), cc.RedT.inGame.mePlayer === this && (this.point.node.active = !0, this.point.string = t.point), this.isLat = !0
            },
            startProgress: function(t) { this.progress.progress = 0, this.progressTime = t, this.oldTime = (new Date).getTime(), this.isUpdate = !0 },
            resetGame: function() { this.isUpdate = !1, this.progress.progress = 0, this.progressTime = 0, this.item.forEach(function(t) { t.node.color = t.node.color.fromHEX("FFFFFF"), t.node.active = !1 }), this.nodeChicken.active = !1, this.nodeDealer.active = !1, this.betDealer.string = "", this.betChicken.string = "", this.point.node.active = !1, this.regOut.active = !1, this.isLat = !1, this.status.destroyAllChildren(), this.isOpen = !1 },
            noticeBet: function(t, e, i, o, c, s) {
                void 0 === s && (s = !1);
                var a = new cc.Node;
                a.addComponent(cc.Label), (a = a.getComponent(cc.Label)).string = e + n.numberWithCommas(t), a.font = c, a.lineHeight = 40, a.fontSize = o, this.status.addChild(a.node);
                var h = 55,
                    r = 0 == e.length ? 0 : "+" == e ? -8 : -3;
                cc.RedT.inGame.mePlayer === this && (r = 0 == e.length ? 0 : "+" == e ? -8 : -4, h = 69), a.node.runAction(cc.sequence(cc.moveTo(.2, cc.v2(r, h)), cc.delayTime(i), cc.callFunc(function() { s && this.destroy(), s = null }, a.node)))
            },
            viewCard: function() { 1 == cc.RedT.user.rights && (this.isOpen ? (this.isOpen = !1, this.item.forEach(function(t) { t.spriteFrame = cc.RedT.util.card.cardB1 })) : cc.RedT.send({ g: { bacay: { viewcard: this.map } } })) },
            update: function(t) {
                if (!0 === this.isUpdate) {
                    var e = ((new Date).getTime() - this.oldTime) / 1e3 / this.progressTime;
                    this.progress.progress = e + t / this.progressTime, this.progress.progress >= 1 && (this.progress.progress = 0, this.progressTime = 0, this.isUpdate = !1)
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    "3Cay_touchCard": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "67e4btO3klMDZ3ujws3/g2/", "3Cay_touchCard"), cc.Class({
            extends: cc.Component,
            onEnable: function() { this.node.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this) },
            onDisable: function() { this.node.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this) },
            eventStart: function(t) { this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.ttOffset.x,
                    i = t.touch.getLocationY() - this.ttOffset.y;
                this.node.position = cc.v2(e, i)
            },
            eventEnd: function() {}
        }), cc._RF.pop()
    }, {}],
    "3Cay": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1a5c1F1N/FBpbmGmzgFLVPV", "3Cay");
        var n = t("Helper"),
            o = t("Notice"),
            c = t("3Cay_player"),
            s = t("3Cay_cuoc"),
            a = t("3Cay_touchCard");
        cc.Class({
            extends: cc.Component,
            properties: { nodeControllCard: cc.Node, nodeControll: cc.ScrollView, font1: cc.BitmapFont, font2: cc.BitmapFont, nodeSelectChuong: cc.Node, labelSelectChuong: cc.Label, nodeSelectGa: cc.Node, labelSelectGa: cc.Label, btn_lat: cc.Node, nodeCard: cc.Node, gameRoom: cc.Label, gameStatus: cc.Label, labelTimeStart: cc.Label, mainBetGa: cc.Label, nodeBetGa: cc.Node, nodeNotice: cc.Node, prefabNotice: cc.Prefab, loading: cc.Node, redhat: cc.Node, noticeOut: cc.Node, notice: o, mePlayer: c, cuoc: s, touchCard: { default: [], type: a }, player: { default: [], type: c }, panel: !1, dataOn: !0, getList: !1 },
            onLoad: function() { this.cardSelect = 0, this.game_round = 0, cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat, this.mePlayer.nickname.string = cc.RedT.user.name, this.mePlayer.balans.string = n.numberWithCommas(cc.RedT.user.red), this.mePlayer.setAvatar(cc.RedT.user.avatar), this.player.forEach(function(t) { t.init() }), cc.RedT.send({ scene: "bacay", g: { bacay: { ingame: !0 } } }) },
            onData: function(t) { t.mini && cc.RedT.MiniPanel.onData(t.mini), t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu), t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp), void 0 !== t.user && cc.RedT.userData(t.user), this.dataOn && (t.viewCard && this.viewCard(t.viewCard), t.listCard && (this.getList = !0, this.listCard(t.listCard)), t.setCard && this.setCard(t.setCard), t.meMap && (this.meMap = t.meMap), t.infoGhe && this.infoGhe(t.infoGhe), t.infoRoom && this.infoRoom(t.infoRoom), t.ingame && this.ingame(t.ingame), t.outgame && this.outgame(t.outgame), t.game && this.game(t.game), t.kick && this.kick(), void 0 !== t.notice && this.notice.show(t.notice)) },
            game: function(t) {
                void 0 !== t.regOut && (this.player[t.regOut.map].regOut.active = t.regOut.reg);
                (t.chia_bai && (this.game_round = 2, this.gameStatus.string = "", this.nodeSelectChuong.active = !1, this.nodeSelectGa.active = !1, this.ChiaBai(t.chia_bai)), t.truong && Object.values(this.player).forEach(function(e) { e.map == t.truong ? e.ic_dealer.active = !0 : e.ic_dealer.active = !1 }), t.player) && this.player[t.player.map].setInfo(t.player);
                (t.listPlayer && t.listPlayer.forEach(function(t) { this.player[t.map].setInfo(t) }.bind(this)), t.done && (this.nodeControll.node.active = !1, this.gameStatus.string = "L\u1eacT B\xc0I", this.nodeSelectChuong.active = !1, this.nodeSelectGa.active = !1, this.btn_lat.active = !1, t.done.forEach(function(t) { this.player[t.map].setInfo(t, !0) }.bind(this))), t.btn_lat && (this.game_round = 2, this.nodeSelectChuong.active = !1, this.nodeSelectGa.active = !1, this.btn_lat.active = !0), t.notice && this.addNotice(t.notice), t.lat) && this.player[t.lat.map].openCard(t.lat);
                void 0 !== t.stop && (t.stop = t.stop >> 0, 0 == t.stop ? this.resetGame() : this.regTime2 = setTimeout(function() { this.resetGame() }.bind(this), 4))
            },
            ChiaBai: function(t) {
                for (var e = this, i = 0, o = function(n) { t.forEach(function(t) { this.player[t.map].ChiaBai(t, n, i), i += .05 }.bind(e)) }, c = 0; c < 3; c++) o(c);
                this.gameStatus.string = "XEM B\xc0I", clearInterval(this.regTime1), this.time_start = 10, this.labelTimeStart.node.active = !0, this.labelTimeStart.string = "", this.regTime1 = setInterval(function() { this.labelTimeStart.string = n.numberPad(this.time_start, 2), this.time_start < 0 && (this.labelTimeStart.node.active = !1, clearInterval(this.regTime1)), this.time_start-- }.bind(this), 1e3)
            },
            infoGhe: function(t) {
                var e = {},
                    i = [];
                if (1 != this.meMap) {
                    var n = this.meMap - 1;
                    i = i.concat(t.slice(n), t.slice(0, n))
                } else i = t;
                i.forEach(function(t, i) {
                    var n = this.player[i];
                    n.map = t.ghe, e[t.ghe] = n, n.setInfo(t.data)
                }.bind(this)), this.player = e, e = null, i = null
            },
            infoRoom: function(t) {
                void 0 !== t.game && (this.gameRoom.string = n.numberWithCommas(t.game), this.labelSelectGa.string = n.numberWithCommas(t.game), this.cuoc.init(t.game)), void 0 !== t.betGa && (this.nodeBetGa.active = !!t.betGa, this.mainBetGa.string = n.numberWithCommas(t.betGa >> 0)), void 0 !== t.isStop && (this.labelTimeStart.node.active = !1, clearInterval(this.regTime1), clearTimeout(this.regTime2)), 1 == t.isPlay && void 0 !== t.time_start && (t.time_start > 0 && this.resetGame(), this.gameStatus.string = "V\xc1N M\u1edaI TRONG", this.time_start = t.time_start >> 0, this.labelTimeStart.node.active = !0, this.labelTimeStart.string = "", clearTimeout(this.regTime2), clearInterval(this.regTime1), this.regTime1 = setInterval(function() { this.labelTimeStart.string = n.numberPad(this.time_start, 2), this.time_start < 0 && (this.labelTimeStart.node.active = !1, clearInterval(this.regTime1)), this.time_start-- }.bind(this), 1e3)), void 0 !== t.card && t.card.forEach(function(t) {
                    var e = this.player[t.ghe];
                    this.mePlayer !== e && e.item.forEach(function(t) { t.node.active = !0, t.spriteFrame = cc.RedT.util.card.cardB1 })
                }.bind(this)), void 0 !== t.round && (this.game_round = t.round, 0 == t.round && (this.gameStatus.string = "V\xc1N M\u1edaI TRONG"), 1 == t.round && (this.gameStatus.string = "\u0110\u1eb6T C\u01af\u1ee2C..."), void 0 !== t.time && (clearInterval(this.regTime1), this.time_start = t.time >> 0, this.labelTimeStart.node.active = !0, this.labelTimeStart.string = "", this.regTime1 = setInterval(function() { this.labelTimeStart.string = n.numberPad(this.time_start, 2), this.time_start < 0 && (this.labelTimeStart.node.active = !1, clearInterval(this.regTime1)), this.time_start-- }.bind(this), 1e3)))
            },
            resetGame: function() { this.getList = !1, this.game_round = 0, this.nodeBetGa.active = !1, this.mainBetGa.string = "", this.gameStatus.string = "", this.btn_lat.active = !1, this.nodeSelectChuong.active = !1, this.nodeSelectGa.active = !1, Object.values(this.player).forEach(function(t) { t.resetGame() }), this.nodeControll.content.destroyAllChildren() },
            ingame: function(t) { this.player[t.ghe].setInfo(t.data) },
            outgame: function(t) { this.player[t].setInfo(null) },
            kick: function() { cc.RedT.MiniPanel.node.parent = null, this.dataOn = !1, this.loading.active = !0, clearInterval(this.regTime1), clearTimeout(this.regTime2), cc.director.loadScene("MainGame") },
            backGame: function() { this.noticeOut.active = !1, cc.RedT.send({ g: { bacay: { regOut: !0 } } }), this.loading.active = !1 },
            signOut: function() { cc.RedT.MiniPanel.node.parent = null, this.dataOn = !1, clearInterval(this.regTime1), clearTimeout(this.regTime2), cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            toggleNoticeOut: function() { this.noticeOut.active = !this.noticeOut.active },
            onCuocGaClick: function() { this.nodeSelectGa.active = !1, cc.RedT.send({ g: { bacay: { cuocG: !0 } } }) },
            onClickLat: function() { this.mePlayer.isLat = !0, this.btn_lat.active = !1, cc.RedT.send({ g: { bacay: { lat: !0 } } }), this.mePlayer.item.forEach(function(t) { t.node.runAction(cc.spawn(cc.moveTo(.1, t.node.defaultPosition), cc.rotateTo(.1, t.node.defaultAngle), cc.scaleTo(.1, 1))) }), this.touchCard.forEach(function(t) { t.onDisable() }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.nodeNotice.addChild(e)
            },
            viewCard: function(t) {
                var e = this.player[t.map];
                e && t.card && 3 == t.card.length && (e.isOpen = !0, e.item.forEach(function(e, i) {
                    var n = t.card[i];
                    e.spriteFrame = cc.RedT.util.card.getCard(n.card, n.type)
                }))
            },
            changerCard: function(t, e) { 1 == cc.RedT.user.rights && (e >>= 0, this.cardSelect == e ? (this.btn_lat.active = this.nodeControll.node.active, this.nodeControll.node.active = !this.nodeControll.node.active) : (this.nodeControll.node.active = !0, this.btn_lat.active = !1, this.cardSelect = e), this.getList || cc.RedT.send({ g: { bacay: { listCard: !0 } } })) },
            onClickChangerCard: function(t) { 1 == cc.RedT.user.rights && cc.RedT.send({ g: { bacay: { setCard: { card: this.cardSelect, data: t.target.card } } } }) },
            listCard: function(t) {
                t.length > 0 && (this.nodeControll.content.destroyAllChildren(), t.sort(function(t, e) { return t.card - e.card }), t.forEach(function(t) {
                    var e = cc.instantiate(this.nodeControllCard);
                    (e = e.getComponent(cc.Sprite)).spriteFrame = cc.RedT.util.card.getCard(t.card, t.type), e.node.card = t, e.node.active = !0, this.nodeControll.content.addChild(e.node)
                }.bind(this)))
            },
            setCard: function(t) { this.mePlayer.item[t.card].spriteFrame = cc.RedT.util.card.getCard(t.data.card, t.data.type) }
        }), cc._RF.pop()
    }, { "3Cay_cuoc": "3Cay_cuoc", "3Cay_player": "3Cay_player", "3Cay_touchCard": "3Cay_touchCard", Helper: "Helper", Notice: "Notice" }],
    AngryBird_history_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cb9e5TUbrlHrp4F0Oa21Pvd", "AngryBird_history_item"), cc.Class({ extends: cc.Component, properties: { time: cc.Label, phien: cc.Label, cuoc: cc.Label, win: cc.Label } }), cc._RF.pop()
    }, {}],
    AngryBird_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0f89dKGp89FS4A0zk0h6nwz", "AngryBird_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, red: !0 },
            onLoad: function() {
                var t = cc.instantiate(this.page);
                t.y = -250, this.node.addChild(t), this.page = t.getComponent("Pagination"), this.page.init(this), this.content = this.content.children.map(function(t) { return t.getComponent("AngryBird_history_item") })
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { angrybird: { log: { red: this.red, page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.node.children[0].active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.cuoc.string = n.numberWithCommas(o.bet), e.win.string = n.numberWithCommas(o.win)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    AngryBird_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "35ab39NsE9AhaEAoAbzTFqx", "AngryBird_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { angrybird: { top: this.red } } }) },
            onData: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("VQRed_history_item")).time.string = n.getStringDateByTime(t.time), i.phien.string = t.name, i.cuoc.string = n.numberWithCommas(t.bet), i.line.string = n.numberWithCommas(t.win), i.win.string = 2 === t.type ? "N\u1ed4 H\u0168" : "TH\u1eaeNG L\u1edaN", i.node.children[0].active = 1 & e, this.content.addChild(i.node)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    "AngryBirds-itemR": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "778daCpzslOUbNzvpIkVWDh", "AngryBirds-itemR"), cc.Class({ extends: cc.Component, properties: { icon: cc.Sprite }, init: function(t) { this.RedT = t }, random: function(t) { void 0 === t && (t = !1); var e = 5 * Math.random() >> 0; return this.setIcon(e), t && (this.data = e), e }, setIcon: function(t, e) { void 0 === e && (e = !1), this.icon.spriteFrame = 0 === t ? this.RedT.icons[0] : this.RedT.iconsX[t - 1], e && (this.data = t) } }), cc._RF.pop()
    }, {}],
    "AngryBirds-item": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "efa70M1TdBLHa9pSAAOj37L", "AngryBirds-item"), cc.Class({ extends: cc.Component, properties: { icon: cc.Sprite }, init: function(t) { this.RedT = t }, random: function(t) { void 0 === t && (t = !1); var e = 6 * Math.random() >> 0; return this.setIcon(e), t && (this.data = e), e }, setIcon: function(t, e) { void 0 === e && (e = !1), this.icon.spriteFrame = this.RedT.icons[t], e && (this.data = t) } }), cc._RF.pop()
    }, {}],
    AngryBirds_reelsL: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "254d4+O0EJLmrFqrwJc7Bsf", "AngryBirds_reelsL"), cc.Class({
            extends: cc.Component,
            properties: {},
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = this;
                Promise.all([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(function(t, e) { var n = cc.instantiate(i.RedT.iconLPrefab); return i.node.addChild(n), (n = n.getComponent("AngryBirds-item")).init(i.RedT), e > 2 && e < 17 && n.random(), n })).then(function(t) { e.icons = t, e.icons[19].setIcon(e.icons[2].random(!0)), e.icons[18].setIcon(e.icons[1].random(!0)), e.icons[17].setIcon(e.icons[0].random(!0)) })
            },
            copy: function() { this.icons[19].setIcon(this.icons[2].data), this.icons[18].setIcon(this.icons[1].data), this.icons[17].setIcon(this.icons[0].data), this.node.y = 0 },
            spin: function(t) {
                this.node.stopAllActions();
                var e = cc.moveTo(1.1, cc.v2(this.node.x, -(this.node.height - 270))).easing(cc.easeInOut(3)),
                    i = cc.callFunc(function() { this.copy() }, this);
                this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, i))
            },
            stop: function() { this.node.stopAllActions(), this.copy() }
        }), cc._RF.pop()
    }, {}],
    AngryBirds_reelsR: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "77651BdeG5Cw5a2bw3wvZf0", "AngryBirds_reelsR"), cc.Class({
            extends: cc.Component,
            properties: {},
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = this;
                Promise.all([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(function(t, e) { var n = cc.instantiate(i.RedT.iconRPrefab); return i.node.addChild(n), (n = n.getComponent("AngryBirds-itemR")).init(i.RedT), e > 2 && e < 20 && n.random(), n })).then(function(t) { e.icons = t, e.icons[22].setIcon(e.icons[2].random(!0)), e.icons[21].setIcon(e.icons[1].random(!0)), e.icons[20].setIcon(e.icons[0].random(!0)) })
            },
            copy: function() { this.icons[22].setIcon(this.icons[2].data), this.icons[21].setIcon(this.icons[1].data), this.icons[20].setIcon(this.icons[0].data), this.node.y = 0 },
            spin: function(t) {
                this.node.stopAllActions();
                var e = cc.moveTo(1.5, cc.v2(this.node.x, -(this.node.height - 270))).easing(cc.easeInOut(3)),
                    i = cc.callFunc(function() { this.copy(), 4 === t && (this.RedT.labelWin.string = 0, this.RedT.hieuUng()) }, this);
                this.node.runAction(cc.sequence(cc.delayTime(.15 * t), e, i))
            },
            stop: function() { this.node.stopAllActions(), this.copy() }
        }), cc._RF.pop()
    }, {}],
    AngryBirds: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "30b8fKriZRPeqMEQoyRprQy", "AngryBirds");
        var n = t("Helper"),
            o = t("AngryBirds_reelsL"),
            c = t("AngryBirds_reelsR");
        cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, line: cc.Node, reelsL: { default: [], type: o }, reelsR: { default: [], type: c }, icons: { default: [], type: cc.SpriteFrame }, iconsX: { default: [], type: cc.SpriteFrame }, iconLPrefab: cc.Prefab, iconRPrefab: cc.Prefab, buttonSpin: cc.Node, buttonAuto: cc.Node, buttonStop: cc.Node, labelWin: cc.Label, bet: cc.Node, notice: cc.Node, hu: cc.Label, cuoc: "", isAuto: !1, isSpin: !1, red: !0 },
            init: function(t) { this.RedT = t, cc.RedT.setting.angrybird = cc.RedT.setting.angrybird || { scale: 1 }, "true" == localStorage.getItem("angrybird") && (this.node.active = !0), void 0 !== cc.RedT.setting.angrybird.position && (this.node.position = cc.RedT.setting.angrybird.position), void 0 !== cc.RedT.setting.angrybird.bet && cc.RedT.setting.angrybird.bet != this.cuoc && this.intChangerBet(), void 0 !== cc.RedT.setting.angrybird.isAuto && this.isAuto != cc.RedT.setting.angrybird.isAuto && this.onClickAuto() },
            onLoad: function() {
                var t = this;
                this.ttOffset = null, this.reelsL.forEach(function(e) { e.init(t) }), this.reelsR.forEach(function(e) { e.init(t) })
            },
            onEnable: function() { this.onGetHu(), this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this), this.onCloseGame() },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.angrybird.position = this.node.position },
            setTop: function() { cc.RedT.setting.angrybird.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            openGame: function() { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("angrybird", !0), this.setTop()) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { this.node.active = !1, localStorage.setItem("angrybird", !1) },
            intChangerBet: function() {
                var t = this;
                Promise.all(this.bet.children.map(function(e) { e.name == cc.RedT.setting.angrybird.bet ? (t.cuoc = e.name, e.children[0].active = !0, e.pauseSystemEvents()) : (e.children[0].active = !1, e.resumeSystemEvents()) }))
            },
            changerBet: function(t, e) {
                this.cuoc = cc.RedT.setting.angrybird.bet = e;
                var i = t.target;
                Promise.all(this.bet.children.map(function(t) { t == i ? (t.children[0].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !1, t.resumeSystemEvents()) })), this.onGetHu()
            },
            autoSpin: function() {
                this.random();
                var t = this;
                [0, 1, 2, 3, 4].forEach(function(e) { e < 3 ? t.reelsL[e].spin(e) : t.reelsR[e - 3].spin(e) })
            },
            onSpin: function() { this.buttonSpin.pauseSystemEvents() },
            offSpin: function() { this.isSpin = this.buttonStop.active = this.isAuto = !1, this.buttonAuto.color = cc.color(155, 155, 155), this.buttonAuto.active = this.buttonSpin.active = !0, this.buttonSpin.resumeSystemEvents() },
            onClickSpin: function() { this.isSpin || (this.isSpin = !0, this.onSpin(), this.onGetSpin()) },
            onClickAuto: function() { this.isAuto = cc.RedT.setting.angrybird.isAuto = !this.isAuto, this.buttonAuto.color = this.isAuto ? cc.Color.WHITE : cc.color(155, 155, 155), this.buttonStop.active = !!this.isSpin && !!this.isAuto, this.buttonAuto.active = !this.buttonStop.active, this.buttonSpin.active = !this.isSpin },
            onClickStop: function() { this.onClickAuto(), this.buttonStop.active = !1 },
            onGetInfo: function() { cc.RedT.send({ g: { angrybird: { info: { cuoc: this.cuoc } } } }) },
            onGetSpin: function() { cc.RedT.send({ g: { angrybird: { spin: { cuoc: this.cuoc } } } }) },
            onCloseGame: function() { this.isSpin = !1, this.reelsL.forEach(function(t) { t.stop() }), this.reelsR.forEach(function(t) { t.stop() }), this.offSpin() },
            addNotice: function(t) {
                var e = cc.instantiate(this.RedT.prefabMiniNotice);
                e.getComponent("mini_warning").text.string = t, this.notice.addChild(e)
            },
            onData: function(t) {
                var e = this,
                    i = this;
                void 0 !== t.status && (1 === t.status ? (this.notice.destroyAllChildren(), this.win = t.win, this.nohu = t.nohu, this.isBigWin = t.isBigWin, this.buttonStop.active = !!this.isAuto, this.buttonAuto.active = this.buttonSpin.active = !this.buttonStop.active, t.celR.forEach(function(t, e) { t.forEach(function(t, n) { i.reelsR[e].icons[n].setIcon(t, !0) }) }), Promise.all(t.cel.map(function(t, e) { return Promise.all(t.map(function(t, n) { i.reelsL[e].icons[n].setIcon(t, !0) })).then(function(t) { return t }) })).then(function(t) { e.autoSpin() })) : this.offSpin()), void 0 !== t.line_win && (this.line_win = t.line_win), void 0 !== t.log && this.RedT.Dialog.AngryBird_history.onData(t.log), void 0 !== t.top && this.RedT.Dialog.AngryBird_top.onData(t.top), void 0 !== t.notice && this.addNotice(t.notice)
            },
            copy: function() { this.reelsL.forEach(function(t) { void 0 !== t.icons && void 0 !== t.icons[19] && void 0 !== t.icons[19].setIcon && (t.icons[19].setIcon(t.icons[2].data), t.icons[18].setIcon(t.icons[1].data), t.icons[17].setIcon(t.icons[0].data)) }), this.reelsR.forEach(function(t) { void 0 !== t.icons && void 0 !== t.icons[22] && void 0 !== t.icons[22].setIcon && (t.icons[22].setIcon(t.icons[2].data), t.icons[21].setIcon(t.icons[1].data), t.icons[20].setIcon(t.icons[0].data)) }) },
            random: function() { this.reelsL.forEach(function(t) { t.icons.forEach(function(t, e) { e > 2 && e < 17 && t.random() }) }), this.reelsR.forEach(function(t) { t.icons.forEach(function(t, e) { e > 2 && e < 20 && t.random() }) }) },
            onGetHu: function() {
                if (void 0 !== cc.RedT.setting.topHu.data && this.node.active) {
                    var t = cc.RedT.setting.topHu.data.arb.filter(function(t) { return t.type == this.cuoc }.bind(this)),
                        e = n.getOnlyNumberInString(this.hu.string),
                        i = t[0].bet;
                    e - i != 0 && n.numberTo(this.hu, e, i, 1500, !0)
                }
            },
            hieuUng: function() {
                if (this.nohu) {
                    this.nohu = !1, 1 == this.isAuto && this.onClickStop();
                    var t = cc.instantiate(this.RedT.PrefabNoHu),
                        e = (t = t.getComponent(cc.Animation)).node.children[6].getComponent(cc.Label);
                    this.RedT.nodeEfect.addChild(t.node), t.on("play", function() {
                        var i = cc.callFunc(function() { cc.RedT.audio.playEf("winHu"), n.numberTo(e, 0, this.win, 1e3, !0) }, this);
                        t.node.runAction(cc.sequence(cc.delayTime(.25), i))
                    }, this), t.on("finished", function() { t.node.destroy(), this.labelWin.string = n.numberWithCommas(this.win), this.win = 0, this.hieuUng() }, this), t.play()
                } else if (!this.nohu && this.isBigWin) {
                    this.isBigWin = !1;
                    var i = cc.instantiate(this.RedT.prefabBigWin);
                    (i = i.getComponent(cc.Animation)).on("finished", function() { this.labelWin.string = n.numberWithCommas(i.node.bet), i.node.destroy(), this.isAuto ? this.onGetSpin() : this.offSpin() }, this), i.node.bet = this.win, i.node.position = cc.v2(0, 98), this.notice.addChild(i.node), this.win = 0, this.isAuto || this.offSpin()
                } else if (!this.isBigWin && this.win > 0) {
                    var o = new cc.Node;
                    o.addComponent(cc.Label), o = o.getComponent(cc.Label), n.numberTo(o, 0, this.win, 600, !0), o.win = this.win, o.font = this.red ? cc.RedT.util.fontCong : cc.RedT.util.fontTru, o.lineHeight = 130, o.fontSize = 25, o.node.position = cc.v2(0, 98), o.node.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function() { this.labelWin.string = n.numberWithCommas(o.win), o.node.destroy(), this.hieuUng(), this.offLineWin() }, this))), this.win = 0, this.notice.addChild(o.node), this.onLineWin()
                } else this.isAuto ? this.timeOut = setTimeout(function() { this.onGetSpin() }.bind(this), 300) : this.offSpin()
            },
            onLineWin: function() {
                var t = this;
                this.line_win.forEach(function(e) { t.line.children[e.line - 1].active = !0 })
            },
            offLineWin: function() { this.line.children.forEach(function(t) { t.active = !1 }) }
        }), cc._RF.pop()
    }, { AngryBirds_reelsL: "AngryBirds_reelsL", AngryBirds_reelsR: "AngryBirds_reelsR", Helper: "Helper" }],
    Avenger_bonus_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "be87eAeEr5HrJp2+29+y4B2", "Avenger_bonus_item"), cc.Class({ extends: cc.Component, properties: { open: cc.Node, close: cc.Node, text: cc.Label } }), cc._RF.pop()
    }, {}],
    Avenger_dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "94141PQdsdHJL69+aOAAtdY", "Avenger_dialog");
        var n = t("Avenger_history"),
            o = t("Avenger_top");
        cc.Class({ extends: cc.Component, properties: { history: n, top: o, help: cc.Node }, init: function() { this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showHistory: function() { this.node.active = this.history.node.active = !0, this.objShow = this.history.node }, showTop: function() { this.node.active = this.top.node.active = !0, this.objShow = this.top.node }, showHelp: function() { this.node.active = this.help.active = !0, this.objShow = this.help } }), cc._RF.pop()
    }, { Avenger_history: "Avenger_history", Avenger_top: "Avenger_top" }],
    Avenger_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c6387XyvLhBpLhMvVcs/67f", "Avenger_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, cointRed: cc.Node, cointXu: cc.Node, red: !0 },
            onLoad: function() {
                var t = this,
                    e = cc.instantiate(this.page);
                e.y = -211, this.node.addChild(e), this.page = e.getComponent("Pagination"), Promise.all(this.content.children.map(function(t) { return t.getComponent("VQRed_history_item") })).then(function(e) { t.content = e }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { avenger: { log: { red: this.red, page: t } } } }) },
            changerCoint: function() { this.red = !this.red, this.cointRed.active = !this.cointRed.active, this.cointXu.active = !this.cointXu.active, this.get_data() },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), Promise.all(this.content.map(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.cuoc.string = n.numberWithCommas(o.bet), e.win.string = o.line + " D\xf2ng", e.line.string = n.numberWithCommas(o.win)) : e.node.active = !1
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Avenger_iline: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "556bbo/CzhMULJrYC6ZI1fJ", "Avenger_iline"), cc.Class({ extends: cc.Component, properties: { line: cc.Node, ef: !1 }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onShow: function() { this.line.active = !0 }, onHidden: function() {!this.ef && (this.line.active = !1) } }), cc._RF.pop()
    }, {}],
    Avenger_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "dd9acY2eQVDX6jx72HXN2j1", "Avenger_item"), cc.Class({
            extends: cc.Component,
            properties: { icons: { default: [], type: cc.Prefab } },
            init: function(t) { this.RedT = t },
            random: function() { var t = 11 * Math.random() >> 0; return this.setIcon(t), t },
            setIcon: function(t, e) {
                void 0 === e && (e = !1), this.node.removeAllChildren();
                var i = cc.instantiate(this.icons[t]);
                this.node.addChild(i), e && (this.data = t)
            }
        }), cc._RF.pop()
    }, {}],
    Avenger_lines: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "8c74dJ5W1pLcZbY3HnKVjqS", "Avenger_lines");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { lines: cc.Node, mainLines: cc.Node },
            init: function(t) {
                var e = this;
                this.RedT = t;
                Promise.all(this.mainLines.children.map(function(t) { return t.getComponent("Avenger_iline") })).then(function(t) { e.mainLines = t }), this.selectAll(null, "1")
            },
            onOpen: function() { this.node.active = !0 },
            onClose: function() { this.RedT.playClick(), this.node.active && this.data.length < 1 ? this.RedT.notice.show({ title: "C\u1ea2NH B\xc1O", text: "Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng" }) : this.node.active = !1 },
            select: function(t) {
                this.RedT.playClick();
                var e = t.target;
                e.color._val != cc.Color.WHITE._val ? e.color = cc.Color.WHITE : e.color = e.color.fromHEX("#8A8A8A"), this.check()
            },
            check: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) { return t.color._val == cc.Color.WHITE._val ? e + 1 : void 0 })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectChan: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (!(i % 2)) return t.color = cc.Color.WHITE, i;
                    t.color = t.color.fromHEX("#8A8A8A")
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectLe: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (i % 2) return t.color = cc.Color.WHITE, i;
                    t.color = t.color.fromHEX("#8A8A8A")
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectAll: function(t, e) {
                var i = this;
                Promise.all(this.lines.children.map(function(t, i) { var n = "1" == e; return t.color = n ? cc.Color.WHITE : t.color.fromHEX("#8A8A8A"), n ? i + 1 : void 0 })).then(function(t) { Promise.all(t.filter(function(t, e) { return void 0 !== t })).then(function(t) { i.data = t, i.RedT.labelLine.string = t.length, i.RedT.tong.string = n.numberWithCommas(t.length * n.getOnlyNumberInString(i.RedT.bet.string)) }) })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Avenger_playBonus: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c122esmKVhLdI0RRrXiyYb0", "Avenger_playBonus");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { numberBonus: cc.Label, listBox: cc.Node, notice: cc.Node, numberWin: cc.Label, icons: { default: [], type: cc.SpriteFrame } },
            init: function(t) {
                var e = this;
                this.RedT = t, Promise.all(this.listBox.children.map(function(t) { return t.getComponent("Zeus_bonus_item") })).then(function(t) { e.listBox = t })
            },
            onPlay: function(t) { this.reset(), this.node.active = !0, this.numberBonus.string = t },
            onClickBox: function(t) { this.numberBonus.string && (this.RedT.playClick(), this.onSend(t.target.name)) },
            closeNotice: function() { this.notice.active = this.node.active = !1, this.RedT.hieuUng() },
            onData: function(t) {
                if (void 0 !== t.box) {
                    var e = this.listBox[t.box];
                    e.open.active = !0, e.close.active = !1, e.text.string = n.numberWithCommas(t.bet), this.numberBonus.string = t.bonus, this.scheduleOnce(function() { e.open.active = !1 }, 1.5)
                }
                void 0 !== t.win && (this.notice.active = !0, this.numberWin.string = n.numberWithCommas(t.win), this.RedT.vuathang.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.RedT.vuathang.string) + t.win))
            },
            onSend: function(t) { cc.RedT.send({ g: { zeus: { bonus: { box: t } } } }) },
            reset: function() { Promise.all(this.listBox.map(function(t) { t.open.active = !1, t.close.active = !0, t.text.string = "" })) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Avenger_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7f5599IowVGRZZl9fUIPS/S", "Avenger_reel"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = this,
                    n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                Promise.all(n.map(function(t, e) { var o = cc.instantiate(i.RedT.icon); return i.node.addChild(o), (o = o.getComponent("Avenger_item")).init(i.RedT), e > 2 && e < n.length - 3 && o.random(), o })).then(function(t) { e.icons = t, e.icons[e.icons.length - 1].setIcon(e.icons[4].random()), e.icons[e.icons.length - 2].setIcon(e.icons[3].random()), e.icons[e.icons.length - 3].setIcon(e.icons[2].random()), e.icons[e.icons.length - 4].setIcon(e.icons[1].random()), e.icons[e.icons.length - 5].setIcon(e.icons[0].random()) })
            },
            spin: function(t, e) {
                this.node.stopAllActions();
                var i = cc.moveTo(e, cc.v2(this.node.x, -(this.node.height - 396))).easing(cc.easeInOut(3)),
                    n = cc.callFunc(function() { 0 === t && this.RedT.copy(), this.node.y = 0 }, this);
                if (4 === t) {
                    var o = cc.callFunc(function() { this.RedT.EF_vuathang(), this.node.y = 0, this.RedT.random(), this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * t), i, o))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * t), i, n))
            },
            stop: function() { this.node.stopAllActions(), this.RedT.copy(), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    Avenger_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c8e56In6LxDwLF7u1AzGyOJ", "Avenger_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { avenger: { top: this.red } } }) },
            onData: function(t) {
                this.content.removeAllChildren();
                var e = this;
                Promise.all(t.map(function(t, i) {
                    var o = cc.instantiate(e.item),
                        c = o.getComponent("VQRed_history_item");
                    c.time.string = n.getStringDateByTime(t.time), c.phien.string = t.name, c.cuoc.string = n.numberWithCommas(t.bet), c.line.string = n.numberWithCommas(t.win), c.win.string = 2 == t.type ? "N\u1ed5 H\u0169" : "Th\u1eafng l\u1edbn", o.children[0].active = !(1 & i), e.content.addChild(o)
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Avenger: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e4b71G2msFI0ZH5MedVVHrn", "Avenger");
        var n = t("Helper"),
            o = t("Avenger_reel"),
            c = t("Avenger_lines"),
            s = t("Avenger_playBonus"),
            a = t("Notice"),
            h = t("Avenger_dialog");
        cc.Class({
            extends: cc.Component,
            properties: { gameBonus: s, audioBG: cc.AudioSource, audioClickSpin: { default: null, type: cc.AudioClip }, audioClick: { default: null, type: cc.AudioClip }, audioWin: { default: null, type: cc.AudioClip }, audioBigWin: { default: null, type: cc.AudioClip }, audioJackpot: { default: null, type: cc.AudioClip }, redhat: cc.Node, reels: { default: [], type: o }, icon: cc.Prefab, icons: { default: [], type: cc.SpriteFrame }, betString: { default: [], type: cc.String }, audioIcons: { default: [], type: cc.SpriteFrame }, audioIcon: cc.Node, nodeNotice: cc.Node, prefabNotice: cc.Prefab, MiniPanel: cc.Prefab, loading: cc.Node, notice: a, dialog: h, Line: c, hu: cc.Label, taikhoan: cc.Label, tong: cc.Label, vuathang: cc.Label, labelLine: cc.Label, bet: cc.Label, freeLabel: cc.Label, phien: cc.Label, BigWin: cc.Animation, BigWin_Label: cc.Label, NoHu_close: cc.Node, NoHu: cc.Animation, NoHu_Label: cc.Label, EF_Bonus: cc.Animation, EF_Free: cc.Animation, buttonLine: cc.Node, buttonSpin: cc.Node, buttonSpinSpeed: cc.Node, buttonBet: cc.Node, buttonAuto: cc.Node, Game: cc.Node, ChonCuoc: cc.Node, hu100: cc.Label, hu1000: cc.Label, hu10000: cc.Label, isSpeed: !1, isForceSpeed: !1, isAuto: !1, isSpin: !1, isFreeSpin: !1, red: !0, betSelect: 0 },
            onLoad: function() {
                cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat;
                this.Line.init(this), this.BigWin.on("finished", this.BigWinFinish, this), this.BigWin.on("play", this.BigWinPlay, this), this.EF_Free.on("finished", this.EF_FreeFinish, this), this.NoHu.on("play", this.NoHuPlay, this), this.EF_Bonus.on("finished", this.EF_BonusFinish, this), this.gameBonus.init(this), this.dialog.init(), this.reels.forEach(function(t) { t.init(this) }.bind(this)), this.Game.active = !1, cc.RedT.send({ scene: "avenger" }), this.taikhoan.string = n.numberWithCommas(cc.RedT.user.red), this.speed = 400, this.resetSpin(), cc.RedT.isSoundBackground() ? (this.playMusic(), this.audioIcon.active = !1) : this.audioIcon.active = !0
            },
            start: function() { this.onChangerBet() },
            _playSFX: function(t) { cc.RedT.IS_SOUND && cc.audioEngine.playEffect(t, !1) },
            playClick: function() { this._playSFX(this.audioClick) },
            BigWinPlay: function() {
                var t = cc.callFunc(function() { this._playSFX(this.audioBigWin), n.numberTo(this.BigWin_Label, 0, this.H_win, 2e3, !0) }, this);
                this.BigWin.node.runAction(cc.sequence(cc.delayTime(.3), t))
            },
            BigWinFinish: function() { this.isBigWin = !1, this.BigWin.node.active = !1, this.BigWin_Label.string = "", this.showLineWin(!1), this.hieuUng() },
            NoHuPlay: function() {
                this.NoHu_Label.string = "";
                var t = cc.callFunc(function() { this._playSFX(this.audioJackpot), n.numberTo(this.NoHu_Label, 0, this.H_win, 2e3, !0) }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(.3), t));
                var e = cc.callFunc(function() { this.NoHu_close.active = !0 }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(4), e))
            },
            NoHuFinish: function() { this.isNoHu = !1, this.isAuto && this.onAuto(), this.showLineWin(!1), this.hieuUng() },
            NoHuClose: function() { this.NoHu.node.active = this.NoHu_close.active = !1, this.NoHuFinish() },
            EF_BonusFinish: function() { this.EF_Bonus.node.active = !1, this.gameBonus.onPlay(this.isBonus), this.isBonus = 0, this.showLineWin(!1) },
            EF_FreeFinish: function() { this.isFree = !1, this.EF_Free.node.active = !1, this.showLineWin(!1), this.hieuUng() },
            onData: function(t) { void 0 !== t.user && (this.userData(t.user), cc.RedT.userData(t.user)), void 0 !== t.Avenger && this.Avenger(t.Avenger), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu, this.onGetHu()), void 0 !== t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            userData: function(t) { this.red && (this.taikhoan.string = n.numberWithCommas(t.red)) },
            Avenger: function(t) {
                var e = this;
                void 0 !== t.status && (1 === t.status ? (Promise.all(t.cel.map(function(t, i) { Promise.all(t.map(function(t, n) { e.reels[i].icons[n].setIcon(t, !0) })) })), this.runReels(this.isSpeed), this.H_line_win = t.line_win, this.H_win = t.win, this.H_free = t.free, this.isBonus = t.isBonus, this.isNoHu = t.isNoHu, this.isBigWin = t.isBigWin, this.isFree = t.isFree, this.isFreeSpin = !!t.free) : this.resetSpin()), t.phien && (this.phien.string = "#" + t.phien), t.bonus && this.gameBonus.onData(t.bonus), t.log && this.dialog.history.onData(t.log), t.top && this.dialog.top.onData(t.top), t.notice && this.addNotice(t.notice)
            },
            EF_vuathang: function() { this.showLineWin(!0), this.vuathang.string = n.numberWithCommas(this.H_win), this.buttonSpin.active = !this.H_free, this.buttonSpinSpeed.active = !this.H_free, this.freeLabel.string = "Free: " + this.H_free, this.freeLabel.node.active = !!this.H_free },
            onLineWin: function(t) {
                var e = this;
                Promise.all(this.H_line_win.map(function(i) {
                    var n = e.Line.mainLines[i.line - 1];
                    t ? (n.ef = !0, n.onShow()) : (n.ef = !1, n.onHidden())
                }))
            },
            showLineWin: function(t) { this.onLineWin(t), t || this.isNoHu || this.isBigWin || this.isAuto || this.isFreeSpin || (this.eflineN = 0, this.efLineWin()) },
            efLineWin: function(t) {
                if (this.H_line_win.length) {
                    this.node.stopAllActions();
                    void 0 === this.H_line_win[this.eflineN] && (this.eflineN = 0), this.efOneLineWin(this.eflineN, !0);
                    var e = cc.callFunc(function() { this.efOneLineWin(this.eflineN, !1), this.eflineN += 1, this.efLineWin() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(1.5), e))
                }
            },
            efOneLineWin: function(t, e) {
                t = this.H_line_win[this.eflineN].line;
                var i = this.Line.mainLines[t - 1];
                e ? (i.ef = !0, i.onShow()) : (i.ef = !1, i.onHidden())
            },
            hieuUng: function() {
                if (this.isBigWin && !this.isNoHu) this.BigWin.node.active = !0, this.BigWin.play(), this.oldBigWin = !0;
                else if (this.isNoHu) this.NoHu.node.active = !0, this.NoHu.play();
                else if (this.isBonus) this.EF_Bonus.node.active = !0, this.EF_Bonus.play(), cc.RedT.audio.playEf("bonus");
                else if (this.isFree) this.EF_Free.node.active = !0, this.EF_Free.play();
                else if (this.H_win > 0) {
                    var t = new cc.Node;
                    t.addComponent(cc.Label), (t = t.getComponent(cc.Label)).string = "+" + n.numberWithCommas(this.H_win), t.font = cc.RedT.util.fontCong, t.lineHeight = 130, t.fontSize = 25, t.node.position = cc.v2(0, 21), this.nodeNotice.addChild(t.node), !this.oldBigWin && this._playSFX(this.audioWin), t.node.runAction(cc.sequence(cc.moveTo(1.2, cc.v2(0, 105)), cc.callFunc(function() { this.speed = 0, t.node.destroy(), this.hieuUng(), this.showLineWin(!1) }, this))), this.H_win = 0, this.oldBigWin = !1
                } else this.isAuto || this.isFreeSpin ? this.timeOut = setTimeout(function() { this.onAutoSpin(), this.speed = 400 }.bind(this), this.speed) : this.resetSpin()
            },
            onChangerBet: function(t, e) {
                this._playSFX(this.audioClick), this.betSelect++, this.betSelect > 2 && (this.betSelect = 0), this.bet.string = this.betString[this.betSelect];
                var i = 25;
                void 0 !== this.Line.data && (i = this.Line.data.length), this.tong.string = n.numberWithCommas(i * n.getOnlyNumberInString(this.bet.string)), this.Game.active = !0, this.resetSpin(), this.onGetHu()
            },
            onSelectBet: function() { this.Game.active = !1, this.ChonCuoc.active = !0, this.onGetHu() },
            changerCoint: function() { this.red = !this.red, this.nodeRed.active = !this.nodeRed.active, this.nodeXu.active = !this.nodeXu.active, this.userData(cc.RedT.user), this.onGetHu() },
            onClickAuto: function() { this._playSFX(this.audioClick), this.onAuto() },
            onAuto: function() { this.isAuto = !this.isAuto, this.isAuto ? this.buttonAuto.color = cc.Color.WHITE : this.buttonAuto.color = this.buttonAuto.color.fromHEX("#8A8A8A") },
            onClickSpin: function() { this.isSpeed = !1, this.onSpin() },
            onClickSpinSpeed: function() { this.isSpeed = !0, this.isAuto && (this.isForceSpeed = !0), this.onSpin() },
            onAutoSpin: function() { this._playSFX(this.audioClickSpin), this.onGetSpin() },
            onSpin: function() { this.Line.data.length < 1 ? this.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : this.isSpin || (this._playSFX(this.audioClickSpin), this.node.stopAllActions(), void 0 !== this.eflineN && void 0 !== this.H_line_win && this.H_line_win.length && this.efOneLineWin(this.eflineN, !1), this.eflineO = this.eflineN = 0, this.isSpin = !0, this.setSpin(), this.onGetSpin()) },
            setSpin: function() { this.buttonLine.pauseSystemEvents(), this.buttonSpin.pauseSystemEvents(), this.buttonSpinSpeed.pauseSystemEvents(), this.buttonBet.pauseSystemEvents() },
            resetSpin: function() { this.isAuto && this.onAuto(), this.isSpin = !1, this.isForceSpeed = !1, this.buttonLine.resumeSystemEvents(), this.buttonSpin.resumeSystemEvents(), this.buttonSpinSpeed.resumeSystemEvents(), this.buttonBet.resumeSystemEvents() },
            runReels: function(t) {
                var e = this;
                Promise.all(this.reels.map(function(i, n) { t || e.isForceSpeed ? i.spin(n, .25) : i.spin(n, 1) })), this.isSpeed = !1
            },
            copy: function() { Promise.all(this.reels.map(function(t) { t.icons[t.icons.length - 1].setIcon(t.icons[2].data), t.icons[t.icons.length - 2].setIcon(t.icons[1].data), t.icons[t.icons.length - 3].setIcon(t.icons[0].data) })) },
            random: function() { Promise.all(this.reels.map(function(t) { Promise.all(t.icons.map(function(e, i) { i > 2 && i < t.icons.length - 3 && e.random() })) })) },
            onGetSpin: function() { cc.RedT.send({ g: { avenger: { spin: { cuoc: n.getOnlyNumberInString(this.bet.string), line: this.Line.data } } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.nodeNotice.addChild(e)
            },
            backGame: function() { cc.RedT.MiniPanel.node.parent = null, this.loading.active = !0, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame") },
            signOut: function() { cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            onGetHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    var e = n.getOnlyNumberInString(this.bet.string);
                    Promise.all(cc.RedT.setting.topHu.data.avenger.filter(function(t) { return t.type == e })).then(function(e) {
                        var i = n.getOnlyNumberInString(t.hu.string),
                            o = e[0].bet;
                        i - o != 0 && n.numberTo(t.hu, i, o, 2e3, !0)
                    })
                }
            },
            onGetAllHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    n.getOnlyNumberInString(this.bet.string);
                    Promise.all(cc.RedT.setting.topHu.data.Avenger.filter(function(t) { return 1 == t.red })).then(function(e) {
                        var i = e.filter(function(t) { return 100 == t.type }),
                            o = e.filter(function(t) { return 1e3 == t.type }),
                            c = e.filter(function(t) { return 1e4 == t.type }),
                            s = n.getOnlyNumberInString(t.hu100.string),
                            a = n.getOnlyNumberInString(t.hu1000.string),
                            h = n.getOnlyNumberInString(t.hu10000.string);
                        s - i[0].bet != 0 && n.numberTo(t.hu100, n.getOnlyNumberInString(t.hu100.string), i[0].bet, 4900, !0), a - o[0].bet != 0 && n.numberTo(t.hu1000, n.getOnlyNumberInString(t.hu1000.string), o[0].bet, 4900, !0), h - c[0].bet != 0 && n.numberTo(t.hu10000, n.getOnlyNumberInString(t.hu10000.string), c[0].bet, 4900, !0)
                    })
                }
            },
            playMusic: function() { this.audioBG.play() },
            pauseMusic: function() { this.audioBG.pause() },
            onSetAudio: function() { cc.RedT.isSoundBackground() ? (cc.RedT.setSoundBackground(!1), this.pauseMusic(), cc.RedT.IS_SOUND = !1, cc.RedT.setSoundGame(!1), this.audioIcon.active = !0) : (cc.RedT.setSoundBackground(!0), this.playMusic(), cc.RedT.IS_SOUND = !0, cc.RedT.setSoundGame(!0), this.audioIcon.active = !1) }
        }), cc._RF.pop()
    }, { Avenger_dialog: "Avenger_dialog", Avenger_lines: "Avenger_lines", Avenger_playBonus: "Avenger_playBonus", Avenger_reel: "Avenger_reel", Helper: "Helper", Notice: "Notice" }],
    BanCa_dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b952dHT2VlLw4NR3GRh7bnP", "BanCa_dialog");
        var n = t("Fish_nap"),
            o = t("Fish_history"),
            c = t("Fish_setting");
        cc.Class({ extends: cc.Component, properties: { Fish_nap: n, Fish_history: o, Fish_fish: cc.Node, Fish_setting: c }, init: function() { this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null, this.Fish_setting.init() }, onClickBack: function() { cc.RedT.inGame.playClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showNap: function(t) { void 0 === t && (t = !1), this.node.active = this.Fish_nap.node.active = !0, this.objShow = this.Fish_nap.node, !0 === t && (this.Fish_nap.outGame = !0) }, showHistory: function() { this.node.active = this.Fish_history.node.active = !0, this.objShow = this.Fish_history.node }, showFish: function() { this.node.active = this.Fish_fish.active = !0, this.objShow = this.Fish_fish }, showSetting: function() { this.node.active = this.Fish_setting.node.active = !0, this.objShow = this.Fish_setting.node } }), cc._RF.pop()
    }, { Fish_history: "Fish_history", Fish_nap: "Fish_nap", Fish_setting: "Fish_setting" }],
    BanCa: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b34005eh71HPbT5/RyPr16x", "BanCa");
        var n = t("Helper"),
            o = t("Notice"),
            c = t("BanCa_dialog"),
            s = t("Fish_player"),
            a = t("Fish_game");
        cc.Class({
            extends: cc.Component,
            properties: { avatar: cc.Sprite, audioClick: cc.AudioSource, audioPhao: cc.AudioSource, audioFire: cc.AudioSource, audioJiaqian: cc.AudioSource, audioReward1: cc.AudioSource, audioReward2: cc.AudioSource, audioReward3: cc.AudioSource, nodeHome: cc.Node, nodeGame: cc.Node, nick: cc.Label, balans: cc.Label, loading: cc.Node, notice: o, dialog: c, Game: a, players: { default: [], type: s }, typeBet1: { default: [], type: cc.String }, typeBet2: { default: [], type: cc.String }, typeBet3: { default: [], type: cc.String }, anim_canh: { default: [], type: cc.String }, anim_sung: { default: [], type: cc.String }, cointMe: cc.SpriteFrame, cointOther: cc.SpriteFrame },
            onLoad: function() { this.volumeNhacNen = 0, this.volumeHieuUng = 0, cc.RedT.audio.bg.pause(), cc.RedT.audio.bg = cc.RedT.audio.fishHall, cc.RedT.inGame = this, cc.RedT.send({ scene: "bc" }), this.nick.string = cc.RedT.user.name, this.balans.string = n.numberWithCommas(cc.RedT.user.red), this.players.forEach(function(t) { t.init(this) }.bind(this)), this.Game.init(this), this.PhysicsManager = cc.director.getPhysicsManager(), this.PhysicsManager.enabled = !0, this.PhysicsManager.gravity = cc.v2(), this.CollisionManager = cc.director.getCollisionManager(), this.CollisionManager.enabled = !0, this.dialog.init(), this.room = { 1: 100, 2: 500, 3: 1e3 }, this.setAvatar(cc.RedT.user.avatar) },
            setAvatar: function(t) { t >>= 0, void 0 !== cc.RedT.avatars[t] ? this.avatar.spriteFrame = cc.RedT.avatars[t] : this.avatar.spriteFrame = cc.RedT.avatars[0] },
            onRegGame: function(t) { this.playClick(), this.regGame = t.target.name, this.dialog.showNap() },
            onData: function(t) { void 0 !== t.fish && this.fishData(t.fish), void 0 !== t.fishs && this.fishsData(t.fishs), void 0 !== t.round && this.round(), void 0 !== t.scene && this.scene(t.scene), void 0 !== t.meMap && (this.MeMap = t.meMap, this.dataMeMap(t.meMap)), void 0 !== t.infoGhe && this.dataInfoGhe(t.infoGhe), void 0 !== t.ingame && this.dataIngame(t.ingame), void 0 !== t.outgame && this.dataOutGame(t.outgame), void 0 !== t.other && this.dataOther(t.other), void 0 !== t.me && this.dataMe(t.me), void 0 !== t.otherEat && this.otherEat(t.otherEat), void 0 !== t.meEat && this.meEat(t.meEat), void 0 !== t.lock && this.fishLock(t.lock), void 0 !== t.unlock && this.fishUnLock(t.unlock), void 0 !== t.notice && this.notice.show(t.notice), void 0 !== t.log && this.dialog.Fish_history.onData(t.log), void 0 !== t.user && cc.RedT.userData(t.user), t.mini && cc.RedT.MiniPanel.onData(t.mini), t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu), t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            round: function() {
                this.fish = {}, this.Game.nodeFish.destroyAllChildren();
                var t = cc.instantiate(this.Game.ef_hailang);
                t = t.getComponent(dragonBones.ArmatureDisplay), this.Game.nodeFish.addChild(t.node), t.playAnimation("hailang", 1), t.on(dragonBones.EventObject.COMPLETE, function() { this.node.destroy() }, t)
            },
            otherEat: function(t) {
                var e = this.Game.fish[t.id];
                if (void 0 !== e) {
                    var i = e.node.position;
                    if (e.inGroup) {
                        var o = e.node.parent.scaleX,
                            c = e.node.parent.angle;
                        i = e.getPosition(), this.Game.nodeFish.insertChild(e.node), e.node.position = i, e.node.scaleX = o, e.node.angle = c
                    }
                    e.PhaHuy();
                    for (var s = this.players[t.map - 1], a = this.Game.efcoint[e.node.fish], h = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min, r = 0; r < h; r++) {
                        var d = cc.instantiate(this.Game.cointOther);
                        (d = d.getComponent("fish_EFcoint")).init(s, i, a)
                    }
                    var u = cc.instantiate(this.Game.labelOther);
                    (u = u.getComponent(cc.Label)).string = n.numberWithCommas(t.money), u.node.position = i, this.Game.nodeLabel.addChild(u.node), s.balans.string = n.numberWithCommas(t.m), e.node.runAction(cc.sequence(cc.delayTime(.6), cc.spawn(cc.scaleTo(.1, .3 * e.node.scaleX, .3), cc.fadeTo(.1, 50)), cc.callFunc(function() { this.onDelete() }, e)));
                    var l = cc.instantiate(this.audioJiaqian.node);
                    (l = l.getComponent(cc.AudioSource)).volume = this.volumeHieuUng, this.Game.nodeAudio.addChild(l.node), l.play(), this.EFBom(a.ef, i)
                }
            },
            meEat: function(t) {
                var e = this.Game.fish[t.id];
                if (void 0 !== e) {
                    var i = e.node.position;
                    if (e.inGroup) {
                        var o = e.node.parent.scaleX,
                            c = e.node.parent.angle;
                        i = e.getPosition(), this.Game.nodeFish.insertChild(e.node), e.node.position = i, e.node.scaleX = o, e.node.angle = c
                    }
                    e.PhaHuy();
                    for (var s = this.Game.efcoint[e.node.fish], a = Math.floor(Math.random() * (s.max - s.min + 1)) + s.min, h = 0; h < a; h++) {
                        var r = cc.instantiate(this.Game.cointMe);
                        (r = r.getComponent("fish_EFcoint")).init(this.Game.player, i, s)
                    }
                    var d = cc.instantiate(this.Game.labelMe);
                    (d = d.getComponent(cc.Label)).string = n.numberWithCommas(t.money), d.node.position = i, this.Game.nodeLabel.addChild(d.node), this.Game.player.money = t.m, this.Game.player.balans.string = n.numberWithCommas(t.m), e.node.runAction(cc.sequence(cc.delayTime(.7), cc.spawn(cc.scaleTo(.2, .3 * e.node.scaleX, .3), cc.fadeTo(.2, 50)), cc.callFunc(function() { this.onDelete() }, e)));
                    var u = cc.instantiate(this.audioReward1.node);
                    (u = u.getComponent(cc.AudioSource)).volume = this.volumeHieuUng, this.Game.nodeAudio.addChild(u.node), u.play(), this.EFBom(s.ef, i)
                }
            },
            fishData: function(t, e) {
                if (void 0 === e && (e = null), t) {
                    var i;
                    if (void 0 !== t.g)(i = (i = cc.instantiate(this.Game["x" + t.g])).getComponent("Fish_fish_group")).init(this.Game, t), this.Game.nodeFish.addChild(i.node);
                    else(i = (i = cc.instantiate(this.Game.fishPrefab[t.f - 1])).getComponent("Fish_fish")).init(this.Game, t), this.Game.fish[t.id] = i, this.Game.nodeFish.addChild(i.node);
                    e && void 0 !== e.t && i.node.runAction(cc.sequence(cc.delayTime(e.t), cc.callFunc(function() { e.c++, e.c < e.f.length && this.fishData(e.f[e.c], e) }, this)))
                }
            },
            fishsData: function(t) { void 0 !== t.t ? this.fishsComp(t) : t.fs ? t.fs.forEach(function(t) { void 0 !== t.t ? this.fishsComp(t) : this.fishData(t) }.bind(this)) : t.f.forEach(function(t) { this.fishData(t) }.bind(this)) },
            fishsComp: function(t) { t.c = 0, this.fishData(t.f[0], t) },
            EFBom: function(t, e) {
                if (2 === t) {
                    var i = cc.instantiate(this.audioReward2.node);
                    (i = i.getComponent(cc.AudioSource)).volume = this.volumeHieuUng, this.Game.nodeAudio.addChild(i.node), i.play();
                    var n = cc.instantiate(this.Game.ef_bom);
                    n.position = e, this.Game.nodeEF.addChild(n), cc.sys.isBrowser || jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Rumble", "once", "(I)V", 200), this.Game.boxAnim.play("Rung2")
                } else if (3 === t) {
                    var o = cc.instantiate(this.audioReward3.node);
                    (o = o.getComponent(cc.AudioSource)).volume = this.volumeHieuUng, this.Game.nodeAudio.addChild(o.node), o.play();
                    var c = cc.instantiate(this.Game.ef_gold_bom);
                    c.position = e, this.Game.nodeEF.addChild(c), cc.sys.isBrowser || jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Rumble", "once", "(I)V", 500), this.Game.boxAnim.play("Rung1")
                }
            },
            otherBullet: function(t) { this.players[t.map - 1].otherBullet(t) },
            dataOther: function(t) {
                t.money && (this.players[t.map - 1].balans.string = n.numberWithCommas(t.money));
                t.updateType && this.updateType(t.updateType), t.bulllet && this.otherBullet(t.bulllet)
            },
            dataMe: function(t) { void 0 !== t.money && (this.Game.player.money = t.money, this.Game.player.balans.string = n.numberWithCommas(t.money)), t.nap && (this.loading.active = !1, this.dialog.onBack()) },
            updateType: function(t) { this.players[t.map - 1].onChangerTypeBet(t.type) },
            dataInfoGhe: function(t) {
                this.loading.active = !1, this.dialog.onBack(), this.players.forEach(function(e, i) {
                    var n = t[i];
                    void 0 === n || null === n.data ? e.node.active = !1 : (this.MeMap === n.ghe && (this.Game.player = e, e.iconCoint.spriteFrame = this.cointMe, e.nodeChangerbet.active = !0, e.isMe = !0), 1 === n.ghe || 2 === n.ghe ? e.sungFix = 1 : e.sungFix = 2, e.node.active = !0, e.onInfo(n.data))
                }.bind(this)), 0 !== this.volumeHieuUng && this.Game.addAudioPhao()
            },
            dataMeMap: function(t) { this.Game.sungFix = 1 === t || 2 === t ? 1 : 2, this.nodeHome.active = !1, this.nodeGame.active = !0, this.nodeGame.y = 0, this.nodeGame.x = 0 },
            dataIngame: function(t) {
                var e = this.players[t.ghe - 1];
                e.iconCoint.spriteFrame = this.cointOther, e.node.active = !0, e.onInfo(t.data), 1 === t.ghe || 2 === t.ghe ? e.sungFix = 1 : e.sungFix = 2;
                var i = this.Game.nodeFish.children.map(function(t) {
                        var e = {};
                        if (void 0 !== t.g) {
                            if (!(t = t.getComponent("Fish_fish_group")) || !t.animState || !t.fish) return;
                            e.g = t.g, e.a = t.animState.name, e.t = t.animState.time, e.f = t.fish.map(function(t) { if (t.node) return { id: t.node.id, f: t.node.fish } })
                        } else {
                            if (!(t = t.getComponent("Fish_fish")) || !t.animState || !t.node) return;
                            e.id = t.id, e.a = t.animState.name, e.t = t.animState.time, e.f = t.node.fish
                        }
                        return e
                    }),
                    n = this.Game.nodeDan.children.map(function(t) { if (t = t.getComponent("Fish_bullet")) return { a: t.node.angle, x: t.node.x, y: t.node.y, type: t.node.name, vx: t.body.linearVelocity.x, vy: t.body.linearVelocity.y } });
                cc.RedT.send({ g: { fish: { getScene: { f: i, b: n, g: t.ghe } } } })
            },
            dataOutGame: function(t) { this.players[t - 1].node.active = !1 },
            backGame: function() { this.playClick(), this.loading.active = !0, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame") },
            fishLock: function(t) {
                var e = this.Game.fish[t.f],
                    i = this.players[t.map - 1];
                void 0 !== e && (e["player" + t.map] = i, i.fish = e, e.updateGroup())
            },
            fishUnLock: function(t) {
                var e = this.players[t - 1];
                e.fish && e.fish.unLock(t)
            },
            signOut: function() { void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            playClick: function() { 0 !== this.volumeHieuUng && this.audioClick.play() },
            scene: function(t) { t.f.forEach(function(t) { this.fishData(t) }.bind(this)), t.b.forEach(function(t) { t && this.sceneBullet(t) }.bind(this)) },
            sceneBullet: function(t) {
                var e = t.a >> 0,
                    i = t.x >> 0,
                    n = t.x >> 0,
                    o = t.type >> 0,
                    c = t.vx >> 0,
                    s = t.vy >> 0,
                    a = this.Game.bullet[o - 1];
                void 0 !== a && ((a = (a = cc.instantiate(a)).getComponent("Fish_bullet")).node.x = i, a.node.y = n, a.node.angle = e, a.bullet = o - 1, a.body.linearVelocity = cc.v2(c, s), a.RedT = this.Game.player, this.Game.nodeDan.addChild(a.node))
            }
        }), cc._RF.pop()
    }, { BanCa_dialog: "BanCa_dialog", Fish_game: "Fish_game", Fish_player: "Fish_player", Helper: "Helper", Notice: "Notice" }],
    Bank: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e83d55pg19B9a0JKV75kU4f", "Bank"), cc.Class({ extends: cc.Component, properties: { header: cc.Node, CodePay: cc.Node, MoMoPay: cc.Node }, init: function() { this.CodePay = this.CodePay.getComponent("CodePay"), this.MoMoPay = this.MoMoPay.getComponent("MoMoPay"), this.body = [this.CodePay, this.MoMoPay], this.header = this.header.children.map(function(t) { return t.getComponent("itemContentMenu") }) }, onSelectHead: function(t, e) { this.header.map(function(t) { t.node.name == e ? t.select() : t.unselect() }), this.body.map(function(t) { t.node.name == e ? t.node.active = !0 : t.node.active = !1 }) }, onData: function(t) { t.list && this.CodePay.onData(t.list), void 0 !== t.atm && this.atm.onData(t.atm) } }), cc._RF.pop()
    }, {}],
    BaoMatGame: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "52a86OUw8tI17le2VUwkbZa", "BaoMatGame"), cc.Class({ extends: cc.Component, properties: {}, start: function() {} }), cc._RF.pop()
    }, {}],
    BaoMatTaiKhoan: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "dd2668dqpdKMbNtz9sjjHi2", "BaoMatTaiKhoan"), cc.Class({ extends: cc.Component, properties: {}, start: function() {} }), cc._RF.pop()
    }, {}],
    BaoMat: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ec1292CT1ZJL5oAGF36VfTW", "BaoMat");
        var n = t("DangKyOTP"),
            o = t("DoiMatKhau");
        cc.Class({
            extends: cc.Component,
            properties: { header: { default: null, type: cc.Node }, DangKyOTP: n, DoiMatKhau: o },
            init: function() {
                var t = this;
                this.body = [this.DangKyOTP.node, this.DoiMatKhau.node], Promise.all(this.header.children.map(function(t) { return t.getComponent("itemContentMenu") })).then(function(e) { t.header = e })
            },
            onSelectHead: function(t, e) { Promise.all(this.header.map(function(t) { t.node.name == e ? t.select() : t.unselect() })), Promise.all(this.body.map(function(t) { t.name == e ? t.active = !0 : t.active = !1 })) },
            superView: function(t) { "DangKyOTP" == t ? this.onSelectHead(null, "DangKyOTP") : "DoiMatKhau" == t && this.onSelectHead(null, "DoiMatKhau") }
        }), cc._RF.pop()
    }, { DangKyOTP: "DangKyOTP", DoiMatKhau: "DoiMatKhau" }],
    BaseControll: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "19011C1h3JPzKZi+tiWEqax", "BaseControll"), e.exports = {
            IS_LOGIN: !1,
            IS_SOUND: !0,
            isConnected: !1,
            _socket: null,
            user: {},
            prefab: {},
            setting: {},
            util: {},
            sslPem: {},
            connect: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/",
                    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                if (!this.isConnected) {
                    var o = "ws" + (n ? "s" : "") + "://" + t + (i ? ":" + i : "") + e;
                    this._socket = new WebSocket(o), this._socket.onopen = this._onSocketConnect, this._socket.onclose = this._onSocketDisconnect, this._socket.onmessage = this._onSocketData, this._socket.onerror = this._onSocketError, this.isConnected = !0
                }
            },
            disconnect: function() { this.isConnected = !1, this._socket.close() },
            send: function(t) { try { this._socket && 1 === this._socket.readyState ? this._socket.send(this._encodeMessage(t)) : (console.log("connect send message"), cc.RedT.inGame.loading.active = !1) } catch (t) { this.inGame.loading.active = !1, this.inGame.notice.show({ title: "TH\xd4NG B\xc1O", text: "KH\xd4NG th\u1ec3 k\u1ebft n\u1ed1i t\u1edbi m\xe1y ch\u1ee7..." }) } },
            _decodeMessage: function(t) { return JSON.parse(t) },
            _encodeMessage: function(t) { return JSON.stringify(t) },
            _onSocketConnect: function() { cc.RedT.isConnected = !0 },
            _onSocketDisconnect: function(t) { cc.RedT.isConnected = !1, cc.RedT.IS_LOGIN ? cc.RedT.inGame.signOut() : cc.RedT.inGame.dialog.onCloseDialog(), cc.RedT.reconnect() },
            _onSocketData: function(t) {
                var e = t.data;
                e = cc.RedT._decodeMessage(e), cc.RedT.inGame && cc.RedT.inGame.onData(e)
            },
            _onSocketError: function(t) {},
            reconnect: function() { this.connect("127.0.0.1", "/client") },
            init: function() {
                cc.view.setResizeCallback(function() { cc.RedT.inGame && cc.RedT.inGame.nodeGame && (cc.RedT.inGame.nodeGame.x = 0, cc.RedT.inGame.nodeGame.y = 0) }), cc.game.on(cc.game.EVENT_HIDE, function() { this.timeHide = (new Date).getTime(), this.inGame.newsOn = !1 }, this), cc.game.on(cc.game.EVENT_SHOW, function() {
                    this.inGame.newsOn = !0, setTimeout(function() {
                        var t = (new Date).getTime();
                        t = (t - this.timeHide) / 1e3, cc.director.getActionManager().update(t), cc.director.getAnimationManager().update(t)
                    }.bind(this), 100)
                }, this), this.initPrototype()
            },
            initPrototype: function() { String.format || (String.format = function(t) { var e = Array.prototype.slice.call(arguments, 1); return t.replace(/{(\d+)}/g, function(t, i) { return void 0 !== e[i] ? e[i] : t }) }) },
            setAutoLogin: function(t) { localStorage.setItem("AUTO_LOGIN", t) },
            isAutoLogin: function() { return "true" == localStorage.getItem("AUTO_LOGIN") },
            setSoundGame: function(t) { localStorage.setItem("SOUND_GAME", t) },
            isSoundGame: function() { return "true" == localStorage.getItem("SOUND_GAME") },
            setSoundBackground: function(t) { localStorage.setItem("SOUND_BACKGROUND", t) },
            isSoundBackground: function() { return "true" == localStorage.getItem("SOUND_BACKGROUND") },
            userData: function(t) { void 0 !== t.avatar && (this.user.avatar = t.avatar), void 0 !== t.rights && (this.user.rights = t.rights), void 0 !== t.name && (this.user.name = t.name), void 0 !== t.username && (this.user.user_name = t.username), void 0 !== t.red && (this.user.red = t.red), void 0 !== t.ketSat && (this.user.ketSat = t.ketSat), void 0 !== t.UID && (this.user.UID = t.UID, localStorage.setItem("TH", t.UID)), void 0 !== t.id && (this.user.id = t.id, localStorage.setItem("TH", t.UID)), void 0 !== t.ref_name && (this.user.ref_name = t.ref_name), void 0 !== t.token && localStorage.setItem("HT", t.token), void 0 !== t.phone && (this.user.phone = t.phone, this.user.veryphone = !!t.veryphone), void 0 !== t.joinedOn && (this.user.joinedOn = t.joinedOn), void 0 !== t.security && (this.user.security = t.security), void 0 !== t.level && (this.user.level = t.level), void 0 !== t.vipHT && (this.user.vipHT = t.vipHT), void 0 !== t.vipNext && (this.user.vipNext = t.vipNext) },
            CopyToClipboard: function(t) {
                if (cc.sys.isBrowser) {
                    var e = document.createElement("input");
                    e.value = t, document.body.appendChild(e), e.select(), e.setSelectionRange(0, 99999), document.execCommand("copy"), e.remove()
                } else { if (cc.sys.os === cc.sys.OS_ANDROID) { jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "CopyToClipboard", "(Ljava/lang/String;)V", t) } else cc.sys.os !== cc.sys.OS_IOS && cc.sys.os !== cc.sys.OS_OSX || jsb.reflection.callStaticMethod("RootViewController", "CopyToClipboard:", t) }
            }
        }, cc._RF.pop()
    }, {}],
    BauCua_LichSu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4b4f6CxJKNB7ada2j1ouX/g", "BauCua_LichSu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, red: !0 },
            init: function(t) { this.RedT = t },
            onLoad: function() { this.page = cc.instantiate(this.page), this.page.y = -285, this.node.addChild(this.page), this.page = this.page.getComponent("Pagination"), this.content = this.content.children.map(function(t) { return t.getComponent("BauCua_ls_item") }), this.page.init(this) },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { baucua: { viewlogs: { red: this.red, page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 0, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.phien, e.thang.string = n.numberWithCommas(o.betwin), e.kq.forEach(function(t, e) { t.spriteFrame = this.RedT.iconMini[o.kq[e]] }.bind(this)), e.datLabel.forEach(function(t, e) { o[e] > 0 ? (t.node.parent.active = !0, t.string = n.nFormatter(o[e], 1)) : t.node.parent.active = !1 })) : e.node.active = !1
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    BauCua_linhVat: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "bb46bQsB6lOkIXs9oBGBiCh", "BauCua_linhVat");
        var n = t("Helper");
        cc.Class({ extends: cc.Component, properties: { xLabel: cc.Label, totall: cc.Label, me: cc.Label, nodeMe: cc.Node, nodeSelect: cc.Node }, meCuoc: function(t) { t ? (this.nodeMe.active = !0, this.me.string = n.nFormatter(t, 1)) : this.nodeMe.active = !1 }, totallCuoc: function(t) { this.totall.string = t ? n.nFormatter(t, 1) : 0 }, Select: function(t) { this.nodeSelect.active = !0, t > 1 ? (this.xLabel.node.active = !0, this.xLabel.string = "x" + t) : this.xLabel.node.active = !1 }, unSelect: function() { this.nodeSelect.active = this.xLabel.node.active = !1 } }), cc._RF.pop()
    }, { Helper: "Helper" }],
    BauCua_logMini: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "058c1CPbRxHYZ8b7k46swQK", "BauCua_logMini"), cc.Class({ extends: cc.Component, properties: { icon: { default: [], type: cc.Sprite } } }), cc._RF.pop()
    }, {}],
    BauCua_ls_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "34cf8eBwhVF04H8tSWu0eiE", "BauCua_ls_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, phien: cc.Label, thang: cc.Label, kq: { default: [], type: cc.Sprite }, datLabel: { default: [], type: cc.Label } } }), cc._RF.pop()
    }, {}],
    BauCua_top_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d2407aqkttNVKBLKz6pUcVF", "BauCua_top_item"), cc.Class({ extends: cc.Component, properties: { stt: cc.Label, nick: cc.Label, win: cc.Label } }), cc._RF.pop()
    }, {}],
    BauCua_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6692a+IWv5GELCMBYie/TgO", "BauCua_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node },
            init: function(t) { this.RedT = t },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { baucua: { tops: !0 } } }) },
            onData: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("BauCua_top_item")).stt.string = e + 1, i.nick.string = t.name, i.win.string = n.numberWithCommas(t.bet), i.node.children[0].active = e % 2, this.content.addChild(i.node)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    BauCua: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "913f0/duAtI8acXyToc0QnK", "BauCua");
        var n = t("Helper"),
            o = t("BauCua_linhVat");
        cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, linhVat: { default: [], type: o }, iconMini: { default: [], type: cc.SpriteFrame }, iconLV: { default: [], type: cc.SpriteFrame }, dices: { default: [], type: cc.Sprite }, logHuou: cc.Label, logBau: cc.Label, logGa: cc.Label, logCa: cc.Label, logCua: cc.Label, logTom: cc.Label, titleTime: cc.Label, labelTime: cc.Label, Animation: cc.Animation, bet: cc.Node, logs: cc.Node, prefabLogs: cc.Prefab, notice: cc.Node, cuoc: "" },
            init: function(t) { this.RedT = t, this.Top = t.Dialog.BauCua_top, this.LichSu = t.Dialog.BauCua_LichSu, cc.RedT.setting.baucua = cc.RedT.setting.baucua || { scale: 1, regOpen: !1, data: { meRedBau: 0, meRedCa: 0, meRedCua: 0, meRedGa: 0, meRedHuou: 0, meRedTom: 0, redBau: 0, redCa: 0, redCua: 0, redGa: 0, redHuou: 0, redTom: 0 }, logLV: {}, bet: "1000" }, "true" == localStorage.getItem("bauCua") && (this.node.active = !0), void 0 !== cc.RedT.setting.baucua.position && (this.node.position = cc.RedT.setting.baucua.position), void 0 !== cc.RedT.setting.baucua.time_remain && (cc.RedT.setting.baucua.time_remain++, this.nextRealTime()), cc.RedT.IS_LOGIN && (this.logLVHandling(cc.RedT.setting.baucua.logLV), this.DataHandling(cc.RedT.setting.baucua.data), void 0 !== cc.RedT.setting.baucua.logLV && this.logLVHandling(cc.RedT.setting.baucua.logLV), void 0 !== cc.RedT.setting.baucua.logs && this.addLogs(), this.intChangerBet()), this.Animation.on("finished", this.AnimationFinish, this) },
            onLoad: function() { this.ttOffset = null },
            onEnable: function() { this.regEvent(!0), this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.regEvent(!1), this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            regEvent: function(t) { cc.RedT.send({ g: { baucua: cc.RedT.setting.baucua.regOpen ? { view: t } : { view: t, regOpen: !0 } } }) },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.baucua.position = this.node.position },
            openGame: function() { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("bauCua", !0), this.setTop()) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { cc.RedT.audio.playUnClick(), this.node.active = !1, localStorage.setItem("bauCua", !1) },
            setTop: function() { cc.RedT.setting.baucua.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            intChangerBet: function() { this.bet.children.forEach(function(t) { t.name == cc.RedT.setting.baucua.bet ? (this.cuoc = t.name, t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }.bind(this)) },
            changerBet: function(t, e) {
                this.cuoc = e;
                var i = t.target;
                this.bet.children.forEach(function(t) { t == i ? (t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }), cc.RedT.setting.baucua.bet = i.name
            },
            AnimationFinish: function() {
                this.addLogs();
                for (var t = cc.RedT.setting.baucua.logs[0], e = {}, i = 0; i < 3; i++) {
                    var n = t[i];
                    cc.RedT.setting.baucua.logLV[n] += 1, void 0 === e[n] ? e[n] = 1 : e[n] += 1
                }
                for (var o = 0; o < 6; o++) void 0 !== e[o] && this.linhVat[o].Select(e[o]);
                this.logLVHandling(cc.RedT.setting.baucua.logLV)
            },
            datCuoc: function(t, e) { this.cuoc < 1e3 ? this.addNotice("Vui l\xf2ng ch\u1ecdn m\u1ee9c c\u01b0\u1ee3c...") : cc.RedT.send({ g: { baucua: { cuoc: { cuoc: this.cuoc, linhVat: e } } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.RedT.prefabMiniNotice);
                e.getComponent("mini_warning").text.string = t, this.notice.addChild(e)
            },
            setDice: function(t) { t.forEach(function(t, e) { this.dices[e].spriteFrame = this.iconLV[t] }.bind(this)) },
            addLogs: function() {
                this.logs.destroyAllChildren(), cc.RedT.setting.baucua.logs.forEach(function(t, e) {
                    var i = cc.instantiate(this.prefabLogs);
                    i.getComponent("BauCua_logMini").icon.map(function(e, i) { e.spriteFrame = this.iconMini[t[i]] }.bind(this)), 0 == e && (i.children[0].children[0].active = !0, i.children[1].children[0].active = !0, i.children[2].children[0].active = !0), this.logs.addChild(i)
                }.bind(this))
            },
            onData: function(t) {
                if (void 0 !== t.data) {
                    Object.assign(cc.RedT.setting.baucua.data, t.data);
                    this.DataHandling(t.data)
                }
                void 0 !== t.logLV && (Object.assign(cc.RedT.setting.baucua.logLV, t.logLV), this.logLVHandling(t.logLV)), void 0 !== t.status && this.status(t.status), void 0 !== t.logs && (cc.RedT.setting.baucua.logs = t.logs, this.addLogs()), void 0 !== t.tops && this.Top.onData(t.tops), void 0 !== t.viewlogs && this.LichSu.onData(t.viewlogs), void 0 !== t.regOpen && (cc.RedT.setting.baucua.regOpen = !0), void 0 !== t.time_remain && (cc.RedT.setting.baucua.time_remain = t.time_remain, this.playTime()), void 0 !== t.finish && (cc.RedT.setting.baucua.regOpen && (this.unSelect(), void 0 !== this.timeInterval && clearInterval(this.timeInterval), cc.RedT.setting.baucua.logs.unshift([t.finish.dices[0], t.finish.dices[1], t.finish.dices[2]]), cc.RedT.setting.baucua.logs.length > 15 && cc.RedT.setting.baucua.logs.pop(), this.setDice(t.finish.dices), this.Animation.node.active = !0, this.Animation.play()), cc.RedT.setting.baucua.time_remain = 72, this.playTime()), void 0 !== t.notice && this.addNotice(t.notice)
            },
            playTime: function() {
                void 0 !== this.timeInterval && clearInterval(this.timeInterval), this.timeInterval = setInterval(function() {
                    if (cc.RedT.setting.baucua.time_remain > 61) {
                        var t = n.numberPad(cc.RedT.setting.baucua.time_remain - 62, 2);
                        this.labelTime.node.color = cc.Color.RED, this.labelTime.string = t, this.titleTime.string = "Tr\u1ea3 th\u01b0\u1edfng", cc.RedT.setting.baucua.time_remain < 66 && (this.Animation.node.active = !1)
                    } else if (this.Animation.node.active = !1, cc.RedT.setting.baucua.regOpen && 61 == cc.RedT.setting.baucua.time_remain && this.resetData(), this.titleTime.string = "\u0110\u1eb7t c\u01b0\u1ee3c", cc.RedT.setting.baucua.time_remain > 0) {
                        var e = n.numberPad(cc.RedT.setting.baucua.time_remain - 1, 2);
                        this.labelTime.string = e, this.labelTime.node.color = cc.Color.WHITE
                    } else clearInterval(this.timeInterval);
                    cc.RedT.setting.baucua.time_remain--
                }.bind(this), 1e3)
            },
            nextRealTime: function() {
                if (cc.RedT.setting.baucua.time_remain > 61) {
                    var t = n.numberPad(cc.RedT.setting.baucua.time_remain - 62, 2);
                    this.labelTime.node.color = cc.Color.RED, this.labelTime.string = n.numberPad(t, 2), this.titleTime.string = "Tr\u1ea3 th\u01b0\u1edfng"
                } else if (this.titleTime.string = "\u0110\u1eb7t c\u01b0\u1ee3c", cc.RedT.setting.baucua.time_remain > 0) {
                    t = n.numberPad(cc.RedT.setting.baucua.time_remain - 1, 2);
                    this.labelTime.string = t, this.labelTime.node.color = cc.Color.WHITE
                }
            },
            logLVHandling: function(t) { this.logHuou.string = n.numberWithCommas(t[0]), this.logBau.string = n.numberWithCommas(t[1]), this.logGa.string = n.numberWithCommas(t[2]), this.logCa.string = n.numberWithCommas(t[3]), this.logCua.string = n.numberWithCommas(t[4]), this.logTom.string = n.numberWithCommas(t[5]) },
            DataHandling: function(t) { void 0 !== t.redHuou && this.linhVat[0].totallCuoc(t.redHuou), void 0 !== t.redBau && this.linhVat[1].totallCuoc(t.redBau), void 0 !== t.redGa && this.linhVat[2].totallCuoc(t.redGa), void 0 !== t.redCa && this.linhVat[3].totallCuoc(t.redCa), void 0 !== t.redCua && this.linhVat[4].totallCuoc(t.redCua), void 0 !== t.redTom && this.linhVat[5].totallCuoc(t.redTom), void 0 !== t.meRedHuou && this.linhVat[0].meCuoc(t.meRedHuou), void 0 !== t.meRedBau && this.linhVat[1].meCuoc(t.meRedBau), void 0 !== t.meRedGa && this.linhVat[2].meCuoc(t.meRedGa), void 0 !== t.meRedCa && this.linhVat[3].meCuoc(t.meRedCa), void 0 !== t.meRedCua && this.linhVat[4].meCuoc(t.meRedCua), void 0 !== t.meRedTom && this.linhVat[5].meCuoc(t.meRedTom) },
            unSelect: function() { this.linhVat.forEach(function(t) { t.unSelect() }) },
            resetData: function() { Object.keys(cc.RedT.setting.baucua.data).forEach(function(t) { cc.RedT.setting.baucua.data[t] = 0 }), this.DataHandling(cc.RedT.setting.baucua.data), this.unSelect() },
            newGame: function() { cc.RedT.setting.baucua.regOpen = !1, void 0 !== this.timeInterval && clearInterval(this.timeInterval), clearTimeout(this.regTimeOut) },
            status: function(t) {
                this.regTimeOut = setTimeout(function() {
                    var e = new cc.Node;
                    if (e.addComponent(cc.Label), (e = e.getComponent(cc.Label)).string = (t.win ? "+" : "-") + n.numberWithCommas(t.bet), e.font = t.win ? cc.RedT.util.fontCong : cc.RedT.util.fontTru, e.lineHeight = 130, e.fontSize = 30, e.node.position = cc.v2(0, 90), this.notice.addChild(e.node), e.node.runAction(cc.sequence(cc.moveTo(3.5, cc.v2(0, 200)), cc.callFunc(function() { this.node.destroy() }, e))), t.win && cc.RedT.send({ user: { updateCoint: !0 } }), void 0 !== t.thuong && t.thuong > 0) {
                        var i = new cc.Node;
                        i.addComponent(cc.Label), (i = i.getComponent(cc.Label)).string = "+" + n.numberWithCommas(t.thuong), i.font = cc.RedT.util.fontEffect, i.lineHeight = 90, i.fontSize = 14, this.notice.addChild(i.node), i.node.runAction(cc.sequence(cc.moveTo(3, cc.v2(0, 100)), cc.callFunc(function() { this.node.destroy() }, i)))
                    }
                }.bind(this), 2e3)
            }
        }), cc._RF.pop()
    }, { BauCua_linhVat: "BauCua_linhVat", Helper: "Helper" }],
    BigBabol_LichSu_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "26605lCb2ROdplGvL50vnD6", "BigBabol_LichSu_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, phien: cc.Label, bet: cc.Label, kq: cc.Label, win: cc.Label } }), cc._RF.pop()
    }, {}],
    BigBabol_LichSu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9bdbaumrolLQrir/GNZ3N0S", "BigBabol_LichSu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, red: !0 },
            onLoad: function() {
                var t = cc.instantiate(this.page);
                t.y = -281, this.node.addChild(t), this.page = t.getComponent("Pagination"), this.content = this.content.children.map(function(t) { return t.getComponent("BigBabol_LichSu_item") }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { big_babol: { log: { red: this.red, page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.bet.string = n.numberWithCommas(o.bet), e.kq.string = o.kq + " D\xf2ng", e.win.string = n.numberWithCommas(o.win)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    BigBabol_Top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9d3a8Q9MRxEvadcBkolfb4n", "BigBabol_Top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            onEnable: function() { this.get_data() },
            get_data: function() { cc.RedT.send({ g: { big_babol: { top: this.red } } }) },
            onData: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("VQRed_history_item")).time.string = n.getStringDateByTime(t.time), i.phien.string = t.name, i.cuoc.string = n.numberWithCommas(t.bet), i.line.string = n.numberWithCommas(t.win), i.win.string = 9 == t.type ? "N\u1ed4 H\u0168" : "TH\u1eaeNG L\u1edaN", i.node.children[0].active = !(1 & e), this.content.addChild(i.node)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    BigBabol_line: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "29fd5Plb1tBC5FqFQowYBnJ", "BigBabol_line"), cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, nodeLine: cc.Node, mainLine: cc.Node },
            init: function(t) { this.RedT = t, this.mainLineInit(void 0 !== cc.RedT.setting.big_babol.line), this.nodeLine.children.forEach(function(t) { t.isSelect = !0 }) },
            onEnable: function() { this.background.on(cc.Node.EventType.MOUSE_ENTER, this.RedT.setTop, this.RedT) },
            onDisable: function() { this.background.off(cc.Node.EventType.MOUSE_ENTER, this.RedT.setTop, this.RedT) },
            toggle: function() { this.node.active && cc.RedT.setting.big_babol.line.length < 1 ? this.RedT.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : this.node.active = !this.node.active },
            select: function(t) {
                var e = t.target;
                e.isSelect = !e.isSelect, e.isSelect ? e.children[0].color = cc.Color.WHITE : e.children[0].color = cc.color(155, 155, 155), this.check()
            },
            check: function() {
                var t = this;
                Promise.all(this.nodeLine.children.map(function(t, e) { return t.isSelect ? e + 1 : void 0 })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { cc.RedT.setting.big_babol.line = e, t.RedT.labelLine.string = e.length + " d\xf2ng" }) })
            },
            selectChan: function() {
                var t = this;
                Promise.all(this.nodeLine.children.map(function(t, e) {
                    var i = e + 1;
                    if (!(i % 2)) return t.isSelect = !0, t.children[0].color = cc.Color.WHITE, i;
                    t.isSelect = !1, t.children[0].color = cc.color(155, 155, 155)
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { cc.RedT.setting.big_babol.line = e, t.RedT.labelLine.string = e.length + " d\xf2ng" }) })
            },
            selectLe: function() {
                var t = this;
                Promise.all(this.nodeLine.children.map(function(t, e) {
                    var i = e + 1;
                    if (i % 2) return t.isSelect = !0, t.children[0].color = cc.Color.WHITE, i;
                    t.isSelect = !1, t.children[0].color = cc.color(155, 155, 155)
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { cc.RedT.setting.big_babol.line = e, t.RedT.labelLine.string = e.length + " d\xf2ng" }) })
            },
            selectAll: function(t, e) {
                var i = this;
                Promise.all(this.nodeLine.children.map(function(t, i) { var n = "1" === e; return n ? (t.isSelect = !0, t.children[0].color = cc.Color.WHITE) : (t.isSelect = !1, t.children[0].color = cc.color(155, 155, 155)), n ? i + 1 : void 0 })).then(function(t) { Promise.all(t.filter(function(t, e) { return void 0 !== t })).then(function(t) { cc.RedT.setting.big_babol.line = t, i.RedT.labelLine.string = t.length + " d\xf2ng" }) })
            },
            mainLineInit: function(t) {
                var e = this,
                    i = this;
                Promise.all(this.mainLine.children.map(function(t) { return t.getComponent("BigBabol_main_line").init(i.RedT) })).then(function(i) { e.mainLine = i, t ? (e.RedT.labelLine.string = cc.RedT.setting.big_babol.line.length + " d\xf2ng", e.nodeLine.children.forEach(function(t, e) { cc.RedT.setting.big_babol.line.filter(function(e) { return e == t.name }).length ? (t.isSelect = !0, t.children[0].color = cc.Color.WHITE) : (t.isSelect = !1, t.children[0].color = cc.color(155, 155, 155)) })) : e.selectAll(null, "1") })
            }
        }), cc._RF.pop()
    }, {}],
    BigBabol_main_line: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "df8c85uzp9M6rkEtOxa9TjC", "BigBabol_main_line"), cc.Class({ extends: cc.Component, init: function(t) { return this.RedT = t, this }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onhover, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.offhover, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onhover, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.offhover, this) }, onhover: function() { this.node.children[0].active = !0 }, offhover: function() { this.node.children[0].active = !1 } }), cc._RF.pop()
    }, {}],
    BigBabol_reel_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9394bXHjwdMpZC0cTOy8c/e", "BigBabol_reel_item"), cc.Class({ extends: cc.Component, properties: { item: cc.Sprite }, init: function(t) { this.RedT = t }, stop: function() { this.node.children.forEach(function(t) { t.getComponents(cc.Animation).forEach(function(e) { t.removeComponent(e) }) }) }, random: function() { var t = ~~(6 * Math.random()); return this.setIcon(t), t }, setIcon: function(t, e) { void 0 === e && (e = !1), this.item.spriteFrame = this.RedT.icons[t], e && (this.data = t) } }), cc._RF.pop()
    }, {}],
    BigBabol_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3c486/mpTFEsoXHhkW8UDhO", "BigBabol_reel"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = this;
                Promise.all([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(function(t, e) { var n = cc.instantiate(i.RedT.iconPrefab); return i.node.addChild(n), (n = n.getComponent("BigBabol_reel_item")).init(i.RedT), e > 2 && e < 23 && (n.stop(), n.random()), n })).then(function(t) { e.icons = t, e.icons[25].setIcon(e.icons[2].random()), e.icons[24].setIcon(e.icons[1].random()), e.icons[23].setIcon(e.icons[0].random()) })
            },
            spin: function(t) {
                this.node.stopAllActions();
                var e = cc.moveTo(1, cc.v2(this.node.x, -(this.node.height - 380))).easing(cc.easeInOut(2)),
                    i = cc.callFunc(function() { this.node.y = 0, this.RedT.random() }, this),
                    n = cc.callFunc(function() { 0 === t && this.RedT.copy(), this.node.y = 0 }, this);
                if (2 === t) {
                    var o = cc.callFunc(function() { this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, i, o))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, n))
            },
            stop: function() { this.node.stopAllActions(), this.RedT.copy(), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    BigBabol: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6bd8dCJ5kJAlrYTElDCPCSm", "BigBabol");
        var n = t("Helper"),
            o = t("BigBabol_reel"),
            c = t("BigBabol_line");
        cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, line: c, labelLine: cc.Label, reels: { default: [], type: o }, icons: { default: [], type: cc.SpriteFrame }, iconPrefab: cc.Prefab, buttonLine: cc.Node, buttonSpin: cc.Node, buttonAuto: cc.Node, buttonStop: cc.Node, bet: cc.Node, notice: cc.Node, phien: cc.Label, hu: cc.Label, cuoc: "", isAuto: !1, isSpeed: !1, isSpin: !1 },
            init: function(t) { this.RedT = t, cc.RedT.setting.big_babol = cc.RedT.setting.big_babol || { scale: 1, bet: this.cuoc }, "true" == localStorage.getItem("big_babol") && (this.node.active = !0), void 0 !== cc.RedT.setting.big_babol.position && (this.node.position = cc.RedT.setting.big_babol.position), void 0 !== cc.RedT.setting.big_babol.bet && cc.RedT.setting.big_babol.bet != this.cuoc && this.intChangerBet(), void 0 !== cc.RedT.setting.big_babol.isAuto && this.isAuto != cc.RedT.setting.big_babol.isAuto && this.onClickAuto() },
            onLoad: function() { this.ttOffset = null, this.line.init(this), this.reels.forEach(function(t) { t.init(this) }.bind(this)) },
            onEnable: function() { this.onGetHu(), this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this), this.onCloseGame() },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.big_babol.position = this.node.position },
            setTop: function() { cc.RedT.setting.big_babol.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            openGame: function() { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("big_babol", !0), this.setTop()) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { cc.RedT.audio.playUnClick(), this.node.active = !1, localStorage.setItem("big_babol", !1) },
            autoSpin: function() { this.reels.forEach(function(t, e) { t.spin(e) }) },
            onSpin: function() { this.buttonLine.pauseSystemEvents(), this.buttonSpin.pauseSystemEvents(), this.line.node.active = !1, this.bet.children.forEach(function(t) { t.pauseSystemEvents() }) },
            offSpin: function() { this.isSpin = this.buttonStop.active = this.isAuto = !1, this.buttonAuto.color = cc.color(155, 155, 155), this.buttonLine.resumeSystemEvents(), this.buttonSpin.resumeSystemEvents(), this.bet.children.forEach(function(t) { t.children[0].active && t.resumeSystemEvents() }) },
            onClickSpin: function() { cc.RedT.setting.big_babol.line.length < 1 ? this.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : this.isSpin || (this.isSpin = !0, this.onSpin(), this.onGetSpin()) },
            onClickAuto: function() { this.isAuto = cc.RedT.setting.big_babol.isAuto = !this.isAuto, this.buttonAuto.color = this.isAuto ? cc.Color.WHITE : cc.color(155, 155, 155), this.buttonStop.active = !!this.isSpin && !!this.isAuto },
            onClickStop: function() { this.onClickAuto(), this.buttonStop.active = !1 },
            intChangerBet: function() { this.bet.children.forEach(function(t) { t.name === cc.RedT.setting.big_babol.bet ? (this.cuoc = t.name, t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }.bind(this)) },
            changerBet: function(t) {
                var e = t.target.name;
                this.cuoc = cc.RedT.setting.big_babol.bet = e, this.bet.children.forEach(function(t) { t.name === e ? (t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }), this.onGetHu()
            },
            onGetInfo: function() { cc.RedT.send({ g: { big_babol: { info: { cuoc: this.cuoc } } } }) },
            onGetSpin: function() { cc.RedT.send({ g: { big_babol: { spin: { cuoc: this.cuoc, line: cc.RedT.setting.big_babol.line } } } }) },
            onCloseGame: function() { this.isSpin = !1, this.reels.forEach(function(t) { t.stop() }), this.offSpin() },
            addNotice: function(t) {
                var e = cc.instantiate(this.RedT.prefabMiniNotice);
                e.getComponent("mini_warning").text.string = t, this.notice.addChild(e)
            },
            onData: function(t) { void 0 !== t.status && (1 === t.status ? (this.notice.destroyAllChildren(), this.win = t.win, this.nohu = t.nohu, this.isBigWin = t.isBigWin, this.buttonStop.active = !!this.isAuto, t.cel.forEach(function(t, e) { t.forEach(function(t, i) { this.reels[e].icons[i].setIcon(t, !0) }.bind(this)) }.bind(this)), this.autoSpin()) : this.offSpin()), void 0 !== t.line_win && (this.line_win = t.line_win), void 0 !== t.phien && (this.phien.string = t.phien), void 0 !== t.log && this.RedT.Dialog.BigBabol_LichSu.onData(t.log), void 0 !== t.top && this.RedT.Dialog.BigBabol_Top.onData(t.top), void 0 !== t.notice && this.addNotice(t.notice) },
            copy: function() { this.reels.forEach(function(t) { void 0 !== t.icons && void 0 !== t.icons[25] && void 0 !== t.icons[25].setIcon && (t.icons[25].setIcon(t.icons[2].data), t.icons[24].setIcon(t.icons[1].data), t.icons[23].setIcon(t.icons[0].data)) }) },
            hieuUng: function() {
                if (this.nohu) {
                    this.nohu = !1, 1 == this.isAuto && this.onClickStop();
                    var t = cc.instantiate(this.RedT.PrefabNoHu),
                        e = (t = t.getComponent(cc.Animation)).node.children[6].getComponent(cc.Label);
                    this.RedT.nodeEfect.addChild(t.node), t.on("play", function() {
                        var i = cc.callFunc(function() { cc.RedT.audio.playEf("winHu"), n.numberTo(e, 0, this.win, 1e3, !0) }, this);
                        t.node.runAction(cc.sequence(cc.delayTime(.25), i))
                    }, this), t.on("finished", function() { t.node.destroy(), this.win = 0, this.hieuUng() }, this), t.play()
                } else if (!this.nohu && this.isBigWin) {
                    this.isBigWin = !1;
                    var i = cc.instantiate(this.RedT.prefabBigWin);
                    (i = i.getComponent(cc.Animation)).on("finished", function() { i.node.destroy(), this.isAuto ? this.onGetSpin() : this.offSpin() }, this), i.node.bet = this.win, i.node.position = cc.v2(0, 75), this.notice.addChild(i.node), this.win = 0, this.isAuto || this.offSpin()
                } else if (!this.isBigWin && this.win > 0) {
                    var o = new cc.Node;
                    o.addComponent(cc.Label), o = o.getComponent(cc.Label), n.numberTo(o, 0, this.win, 600, !0), o.font = cc.RedT.util.fontCong, o.lineHeight = 130, o.fontSize = 25, o.node.position = cc.v2(0, 40), o.node.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function() { o.node.destroy(), this.hieuUng(), this.offLineWin() }, this))), this.notice.addChild(o.node), this.win = 0, this.onLineWin()
                } else this.isAuto ? this.timeOut = setTimeout(function() { this.onGetSpin() }.bind(this), 300) : this.offSpin()
            },
            onLineWin: function() {
                this.line_win.forEach(function(t) {
                    var e = this.line.mainLine[t.line - 1];
                    e.onhover(), e.node.pauseSystemEvents()
                }.bind(this))
            },
            offLineWin: function() {
                this.line_win.forEach(function(t) {
                    var e = this.line.mainLine[t.line - 1];
                    e.offhover(), e.node.resumeSystemEvents()
                }.bind(this))
            },
            random: function() { this.reels.forEach(function(t) { t.icons.forEach(function(t, e) { e > 2 && e < 23 && t.random() }) }) },
            onGetHu: function() {
                if (void 0 !== cc.RedT.setting.topHu.data && this.node.active) {
                    var t = cc.RedT.setting.topHu.data.big_babol.filter(function(t) { return t.type == this.cuoc }.bind(this)),
                        e = n.getOnlyNumberInString(this.hu.string),
                        i = t[0].bet;
                    e - i != 0 && n.numberTo(this.hu, e, i, 2e3, !0)
                }
            }
        }), cc._RF.pop()
    }, { BigBabol_line: "BigBabol_line", BigBabol_reel: "BigBabol_reel", Helper: "Helper" }],
    BrowserUtil: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3144b0EOb5M+JRv7V+30M1S", "BrowserUtil"), e.exports = { showCursorText: function() { this.isCursorAuto() || this.setCursor("text") }, showCursorPointer: function() { this.isCursorAuto() || this.setCursor("pointer") }, showCursorMove: function() { this.isCursorAuto() || this.setCursor("move") }, showCursorAuto: function() { this.isCursorAuto() || this.setCursor("auto") }, showCursorFish: function() { cc.sys.isBrowser && (cc.game.canvas.style.cursor = "url('/assets/fish_game_arrow.png'), auto") }, showCursorAutoForce: function() { cc.sys.isBrowser && this.setCursor("auto") }, isCursorAuto: function() { return !!cc.sys.isBrowser && "auto" === document.getElementById("GameDiv").style.cursor }, setCursor: function(t) { cc.sys.isBrowser && (cc.game.canvas.style.cursor = t) }, showTooltip: function(t) { cc.sys.isBrowser && (document.body.title = t) }, focusGame: function() { cc.sys.isBrowser && cc.game.canvas.focus() }, getHTMLElementByEditBox: function(t) { return t._impl._elem }, checkEditBoxFocus: function(t) { return t.isFocused() }, focusEditBox: function(t) { t._impl._elem.focus(), t.focus() }, unFocusEditBox: function(t) {}, inputAddEvent: function(t, e, i) { t._impl._elem.addEventListener(e, i) }, inputRemoveEvent: function(t, e, i) { t._impl._elem.removeEventListener(e, i) }, readOnlyEditBox: function(t) { t.readOnly = !0 } }, cc._RF.pop()
    }, {}],
    CaNhan: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "47772lCqUBB4owyBQc/Yrdt", "CaNhan");
        t("Helper");
        cc.Class({ extends: cc.Component, properties: { body: cc.Node, avatar: cc.Sprite, red: cc.Label, redKet: cc.Label, username: cc.Label, login_name: cc.Label, phone: cc.Label, phoneStatus: cc.Label, phoneActive: cc.Node, joinedOn: cc.Label, ref_name: cc.Label }, init: function() {}, onEnable: function() {} }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Candy_bonus_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d4e35v/kElGdrvv9FRszHdd", "Candy_bonus_item"), cc.Class({ extends: cc.Component, properties: { item: cc.Sprite, text: cc.Label } }), cc._RF.pop()
    }, {}],
    Candy_dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "09680O6Rg9HML88fBtJFvh9", "Candy_dialog");
        var n = t("Candy_history"),
            o = t("Candy_top");
        cc.Class({ extends: cc.Component, properties: { history: n, top: o, help: cc.Node }, init: function() { this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showHistory: function() { this.node.active = this.history.node.active = !0, this.objShow = this.history.node }, showTop: function() { this.node.active = this.top.node.active = !0, this.objShow = this.top.node }, showHelp: function() { this.node.active = this.help.active = !0, this.objShow = this.help } }), cc._RF.pop()
    }, { Candy_history: "Candy_history", Candy_top: "Candy_top" }],
    Candy_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "17e0aDFKYhBNoHw5YygdT+w", "Candy_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node },
            onLoad: function() {
                var t = cc.instantiate(this.page);
                t.y = -278, this.node.addChild(t), this.page = t.getComponent("Pagination"), this.content = this.content.children.map(function(t) { return t.getComponent("VQRed_history_item") }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { candy: { log: { page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.cuoc.string = n.numberWithCommas(o.bet), e.line.string = o.kq + " D\xf2ng", e.win.string = n.numberWithCommas(o.win)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Candy_iLine: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ca5891XEyBMXooOmHi4eVGy", "Candy_iLine"), cc.Class({ extends: cc.Component, properties: { line: cc.Node, ef: !1 }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onShow: function() { this.line.active = !0 }, onHidden: function() {!this.ef && (this.line.active = !1) } }), cc._RF.pop()
    }, {}],
    Candy_line: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6e0c4Ag8FpJQ6D5qWtj+OkS", "Candy_line");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { lines: cc.Node, mainLines: cc.Node },
            init: function(t) {
                var e = this;
                this.RedT = t;
                Promise.all(this.mainLines.children.map(function(t) { return t.getComponent("Candy_iLine") })).then(function(t) { e.mainLines = t }), this.selectAll(null, "1")
            },
            onOpen: function() { cc.RedT.audio.playClick(), this.node.active = !0 },
            onClose: function() { cc.RedT.audio.playUnClick(), this.node.active && this.data.length < 1 ? this.RedT.notice.show({ title: "C\u1ea2NH B\xc1O", text: "Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng" }) : this.node.active = !1 },
            select: function(t) {
                var e = t.target;
                e.children[0].active ? (e.children[0].active = !1, e.children[1].active = !0) : (e.children[0].active = !0, e.children[1].active = !1), this.check()
            },
            check: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) { return t.children[1].active ? e + 1 : void 0 })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectChan: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (!(i % 2)) return t.children[0].active = !1, t.children[1].active = !0, i;
                    t.children[0].active = !0, t.children[1].active = !1
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectLe: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (i % 2) return t.children[0].active = !1, t.children[1].active = !0, i;
                    t.children[0].active = !0, t.children[1].active = !1
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectAll: function(t, e) {
                var i = this;
                Promise.all(this.lines.children.map(function(t, i) { var n = "1" == e; return t.children[1].active = n, t.children[0].active = !n, n ? i + 1 : void 0 })).then(function(t) { Promise.all(t.filter(function(t, e) { return void 0 !== t })).then(function(t) { i.data = t, i.RedT.labelLine.string = t.length, i.RedT.tong.string = n.numberWithCommas(t.length * n.getOnlyNumberInString(i.RedT.bet.string)) }) })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Candy_playBonus: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6f5fd6x7T5GNJOs0sePV0JY", "Candy_playBonus");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { numberBonus: cc.Label, winBonus: cc.Label, listBox: cc.Node, notice: cc.Node, numberWin: cc.Label, iconsOpen: cc.SpriteFrame, iconsClose: cc.SpriteFrame },
            init: function(t) { this.RedT = t, this.listBox = this.listBox.children.map(function(t) { return t.getComponent("Candy_bonus_item") }) },
            onPlay: function() { this.reset(), this.node.active = !0, this.numberBonus.string = 10 },
            onClickBox: function(t) { this.numberBonus.string && (cc.RedT.audio.playClick(), this.onSend(t.target.name)) },
            closeNotice: function() { this.notice.active = this.node.active = !1, this.RedT.hieuUng() },
            onData: function(t) {
                void 0 !== t.box && (this.listBox[t.box].text.string = n.numberWithCommas(t.bet), this.numberBonus.string = t.bonus);
                void 0 !== t.win && (this.notice.active = !0, this.numberWin.string = n.numberWithCommas(t.win), this.RedT.vuathang.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.RedT.vuathang.string) + t.win))
            },
            onSend: function(t) { cc.RedT.send({ g: { candy: { bonus: { box: t } } } }) },
            reset: function() { this.listBox.forEach(function(t) { t.item.spriteFrame = this.iconsClose, t.text.string = "" }.bind(this)) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Candy_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4ac84jBjYBJiZpTkOu4E3j8", "Candy_reel"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                Promise.all(i.map(function(t, e) { var n = cc.instantiate(this.RedT.icon); return this.node.addChild(n), (n = n.getComponent("candy_reel_item")).init(this.RedT), e > 2 && e < i.length - 3 && n.random(), n }.bind(this))).then(function(t) { e.icons = t, e.icons[e.icons.length - 1].setIcon(e.icons[4].random()), e.icons[e.icons.length - 2].setIcon(e.icons[3].random()), e.icons[e.icons.length - 3].setIcon(e.icons[2].random()), e.icons[e.icons.length - 4].setIcon(e.icons[1].random()), e.icons[e.icons.length - 5].setIcon(e.icons[0].random()) })
            },
            spin: function(t) {
                this.node.stopAllActions();
                var e = cc.moveTo(1, cc.v2(this.node.x, -(this.node.height - 489))).easing(cc.easeInOut(3)),
                    i = cc.callFunc(function() { 0 === t && this.RedT.copy(), this.node.y = 0 }, this);
                if (4 === t) {
                    var n = cc.callFunc(function() { this.RedT.EF_vuathang(), this.node.y = 0, this.RedT.random(), this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, n))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, i))
            },
            stop: function() { this.node.stopAllActions(), this.RedT.copy(), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    Candy_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9972eRTCvJEwony+DM8Ery0", "Candy_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { candy: { top: !0 } } }) },
            onData: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item),
                        o = i.getComponent("VQRed_history_item");
                    o.time.string = n.getStringDateByTime(t.time), o.phien.string = t.name, o.cuoc.string = n.numberWithCommas(t.bet), o.line.string = n.numberWithCommas(t.win), o.win.string = 2 == t.type ? "N\u1ed5 H\u0169" : "Th\u1eafng l\u1edbn", i.children[0].active = !(1 & e), this.content.addChild(i)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Candy: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "51097oLSzpFtZ9xj7eGzl0G", "Candy");
        var n = t("Helper"),
            o = t("Candy_reel"),
            c = t("Candy_line"),
            s = t("Candy_playBonus"),
            a = t("Notice"),
            h = t("Candy_dialog");
        cc.Class({
            extends: cc.Component,
            properties: { gameBonus: s, redhat: cc.Node, reels: { default: [], type: o }, icon: cc.Prefab, icons: { default: [], type: cc.SpriteFrame }, FrameAuto: { default: [], type: cc.SpriteFrame }, betString: { default: [], type: cc.String }, nodeNotice: cc.Node, prefabNotice: cc.Prefab, loading: cc.Node, notice: a, dialog: h, Line: c, hu: cc.Label, taikhoan: cc.Label, tong: cc.Label, vuathang: cc.Label, labelLine: cc.Label, bet: cc.Label, freeLabel: cc.Label, nodeFree: cc.Node, BigWin: cc.Animation, BigWin_Label: cc.Label, NoHu_close: cc.Node, NoHu: cc.Animation, NoHu_Label: cc.Label, EF_Bonus: cc.Animation, EF_Free: cc.Animation, buttonLine: cc.Node, buttonSpin: cc.Node, nodeChangerBetL: cc.Node, nodeChangerBetR: cc.Node, skeleSpin: sp.Skeleton, buttonAuto: cc.Sprite, isAuto: !1, isSpin: !1, isFreeSpin: !1, betSelect: 0 },
            onLoad: function() { cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat, this.Line.init(this), this.gameBonus.init(this), this.BigWin.on("finished", this.BigWinFinish, this), this.BigWin.on("play", this.BigWinPlay, this), this.NoHu.on("finished", this.NoHuFinish, this), this.NoHu.on("play", this.NoHuPlay, this), this.EF_Bonus.on("finished", this.EF_BonusFinish, this), this.EF_Free.on("finished", this.EF_FreeFinish, this), this.reels.forEach(function(t) { t.init(this) }.bind(this)), cc.RedT.send({ scene: "candy" }), this.taikhoan.string = n.numberWithCommas(cc.RedT.user.red), this.speed = 400 },
            BigWinPlay: function() {
                var t = cc.callFunc(function() { cc.RedT.audio.playEf("megaWin"), n.numberTo(this.BigWin_Label, 0, this.H_win, 2e3, !0) }, this);
                this.BigWin.node.runAction(cc.sequence(cc.delayTime(.3), t))
            },
            BigWinFinish: function() { this.isBigWin = !1, this.BigWin.node.active = !1, this.BigWin_Label.string = "", this.showLineWin(!1), this.hieuUng() },
            NoHuPlay: function() {
                this.NoHu_Label.string = "";
                var t = cc.callFunc(function() { cc.RedT.audio.playEf("jackpot"), n.numberTo(this.NoHu_Label, 0, this.H_win, 2e3, !0) }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(.3), t))
            },
            NoHuFinish: function() { this.isNoHu = !1, this.NoHu_close.active = !0, this.isAuto && this.onAuto(), this.showLineWin(!1), this.hieuUng() },
            NoHuClose: function() { this.NoHu.node.active = this.NoHu_close.active = !1 },
            EF_BonusFinish: function() { this.isBonus = !1, this.EF_Bonus.node.active = !1, this.gameBonus.onPlay(), this.showLineWin(!1) },
            EF_FreeFinish: function() { this.isFree = !1, this.EF_Free.node.active = !1, this.showLineWin(!1), this.hieuUng() },
            onData: function(t) { void 0 !== t.user && (this.userData(t.user), cc.RedT.userData(t.user)), void 0 !== t.candy && this.Candy(t.candy), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu, this.onGetHu()), void 0 !== t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            userData: function(t) { this.taikhoan.string = n.numberWithCommas(t.red) },
            Candy: function(t) { void 0 !== t.status && (1 === t.status ? (t.cel.forEach(function(t, e) { t.forEach(function(t, i) { this.reels[e].icons[i].setIcon(t, !0) }.bind(this)) }.bind(this)), this.runReels(), this.H_line_win = t.line_win, this.H_win = t.win, this.H_free = t.free, this.isBonus = t.isBonus, this.isNoHu = t.isNoHu, this.isBigWin = t.isBigWin, this.isFree = t.isFree, this.isFreeSpin = !!t.free) : this.resetSpin()), t.bonus && this.gameBonus.onData(t.bonus), t.log && this.dialog.history.onData(t.log), t.top && this.dialog.top.onData(t.top), t.notice && this.addNotice(t.notice) },
            EF_vuathang: function() { this.showLineWin(!0), this.vuathang.string = n.numberWithCommas(this.H_win), this.freeLabel.string = this.H_free, this.buttonSpin.active = !this.H_free, this.nodeFree.active = !!this.H_free },
            onLineWin: function(t) {
                this.H_line_win.map(function(e) {
                    var i = this.Line.mainLines[e.line - 1];
                    t ? (i.ef = !0, i.onShow()) : (i.ef = !1, i.onHidden())
                }.bind(this))
            },
            showLineWin: function(t) { this.onLineWin(t), t || this.isNoHu || this.isBigWin || this.isAuto || this.isFreeSpin || (this.eflineN = 0, this.efLineWin()) },
            efLineWin: function(t) {
                if (this.H_line_win.length) {
                    this.node.stopAllActions(), void 0 === this.H_line_win[this.eflineN] && (this.eflineN = 0), this.efOneLineWin(this.eflineN, !0);
                    var e = cc.callFunc(function() { this.efOneLineWin(this.eflineN, !1), this.eflineN += 1, this.efLineWin() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(1.5), e))
                }
            },
            efOneLineWin: function(t, e) {
                t = this.H_line_win[this.eflineN].line;
                var i = this.Line.mainLines[t - 1];
                e ? (i.ef = !0, i.onShow()) : (i.ef = !1, i.onHidden())
            },
            hieuUng: function() {
                if (this.isBigWin && !this.isNoHu) this.BigWin.node.active = !0, this.BigWin.play();
                else if (this.isNoHu) this.NoHu.node.active = !0, this.NoHu.play();
                else if (this.isBonus) this.EF_Bonus.node.active = !0, this.EF_Bonus.play(), cc.RedT.audio.playEf("bonus");
                else if (this.isFree) this.EF_Free.node.active = !0, this.EF_Free.play();
                else if (this.H_win > 0) {
                    var t = new cc.Node;
                    t.addComponent(cc.Label), (t = t.getComponent(cc.Label)).string = "+" + n.numberWithCommas(this.H_win), t.font = cc.RedT.util.fontCong, t.lineHeight = 130, t.fontSize = 25, t.node.position = cc.v2(0, 21), this.nodeNotice.addChild(t.node), t.node.runAction(cc.sequence(cc.moveTo(1.2, cc.v2(0, 105)), cc.callFunc(function() { this.speed = 0, t.node.destroy(), this.hieuUng(), this.showLineWin(!1) }, this))), this.H_win = 0
                } else this.isAuto || this.isFreeSpin ? this.timeOut = setTimeout(function() { this.onAutoSpin(), this.speed = 400 }.bind(this), this.speed) : this.resetSpin()
            },
            onChangerBetR: function() { cc.RedT.audio.playClick(), this.betSelect++, this.betSelect > 2 && (this.betSelect = 0), this.bet.string = this.betString[this.betSelect], this.tong.string = n.numberWithCommas(this.Line.data.length * n.getOnlyNumberInString(this.bet.string)), this.onGetHu() },
            onChangerBetL: function() { cc.RedT.audio.playClick(), this.betSelect--, this.betSelect < 0 && (this.betSelect = 2), this.bet.string = this.betString[this.betSelect], this.tong.string = n.numberWithCommas(this.Line.data.length * n.getOnlyNumberInString(this.bet.string)), this.onGetHu() },
            onClickAuto: function() { cc.RedT.audio.playClick(), this.onAuto() },
            onAuto: function() { this.isAuto = !this.isAuto, this.isAuto ? this.buttonAuto.spriteFrame = this.FrameAuto[1] : this.buttonAuto.spriteFrame = this.FrameAuto[0] },
            onClickSpin: function() { this.onSpin() },
            onAutoSpin: function() { this.onGetSpin() },
            onSpin: function() { this.Line.data.length < 1 ? this.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : this.isSpin || (this.node.stopAllActions(), void 0 !== this.eflineN && void 0 !== this.H_line_win && this.H_line_win.length && this.efOneLineWin(this.eflineN, !1), this.eflineO = this.eflineN = 0, this.isSpin = !0, this.setSpin(), this.onGetSpin()) },
            setSpin: function() { this.buttonLine.pauseSystemEvents(), this.buttonSpin.pauseSystemEvents(), this.nodeChangerBetL.pauseSystemEvents(), this.nodeChangerBetR.pauseSystemEvents(), this.skeleSpin.setAnimation(0, "animation", !0), this.skeleSpin.paused = !1 },
            resetSpin: function() { this.isAuto && this.onAuto(), this.isSpin = !1, this.buttonLine.resumeSystemEvents(), this.buttonSpin.resumeSystemEvents(), this.nodeChangerBetL.resumeSystemEvents(), this.nodeChangerBetR.resumeSystemEvents(), this.skeleSpin.paused = !0 },
            runReels: function() { this.reels.forEach(function(t, e) { t.spin(e) }) },
            copy: function() { this.reels.forEach(function(t) { t.icons[t.icons.length - 1].setIcon(t.icons[2].data), t.icons[t.icons.length - 2].setIcon(t.icons[1].data), t.icons[t.icons.length - 3].setIcon(t.icons[0].data) }) },
            random: function() { this.reels.forEach(function(t) { t.icons.forEach(function(e, i) { i > 2 && i < t.icons.length - 3 && e.random() }) }) },
            onGetSpin: function() { cc.RedT.send({ g: { candy: { spin: { cuoc: n.getOnlyNumberInString(this.bet.string), line: this.Line.data } } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.nodeNotice.addChild(e)
            },
            backGame: function() { cc.RedT.MiniPanel.node.parent = null, this.loading.active = !0, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame") },
            signOut: function() { cc.RedT.MiniPanel.node.parent = null, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            onGetHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    var e = n.getOnlyNumberInString(this.bet.string);
                    Promise.all(cc.RedT.setting.topHu.data.candy.filter(function(t) { return t.type == e })).then(function(e) {
                        var i = n.getOnlyNumberInString(t.hu.string),
                            o = e[0].bet;
                        i - o != 0 && n.numberTo(t.hu, i, o, 2e3, !0)
                    })
                }
            }
        }), cc._RF.pop()
    }, { Candy_dialog: "Candy_dialog", Candy_line: "Candy_line", Candy_playBonus: "Candy_playBonus", Candy_reel: "Candy_reel", Helper: "Helper", Notice: "Notice" }],
    CanvasHelper: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5a1c0y/ocdDKJ1xgdvfiTYj", "CanvasHelper");
        cc.Class({
            extends: cc.Component,
            properties: { currentCanvas: cc.Canvas },
            start: function() { this.onResized() },
            onResized: function() {
                if (null != this.currentCanvas) {
                    if (cc.sys.isNative && cc.sys.isMobile) cc.view.isAutoFullScreenEnabled() && cc.view.enableAutoFullScreen(!0);
                    var t = cc.view.getFrameSize();
                    (t.width / t.height).toFixed(2) < (16 / 9).toFixed(2) ? (this.currentCanvas._fitHeight = !1, this.currentCanvas._fitWidth = !0) : (this.currentCanvas._fitHeight = !0, this.currentCanvas._fitWidth = !1), this.currentCanvas.applySettings()
                }
            }
        });
        cc._RF.pop()
    }, {}],
    CaoThap_history_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4816cEGzJ1O1riIu0aE1iNT", "CaoThap_history_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, phien: cc.Label, cuoc: cc.Label, buoc: cc.Label, card1: cc.Sprite, select: cc.Node, card2: cc.Sprite, win: cc.Label } }), cc._RF.pop()
    }, {}],
    CaoThap_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "025c7+UqBFBWKVKH56kQUN5", "CaoThap_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, red: !0 },
            init: function(t) { this.RedT = t },
            onLoad: function() { this.page = cc.instantiate(this.page), this.page.y = -272, this.node.addChild(this.page), this.page = this.page.getComponent("Pagination"), this.content = this.content.children.map(function(t) { return t.getComponent("CaoThap_history_item") }), this.page.init(this) },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { caothap: { history: { red: this.red, page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.buoc.string = o.buoc, e.cuoc.string = n.numberWithCommas(o.cuoc), e.win.string = n.numberWithCommas(o.bet), e.card1.spriteFrame = cc.RedT.util.card.getCard(o.card1.card, o.card1.type), o.chon ? (e.select.active = !0, 2 == o.chon ? e.select.scaleY = -1 : e.select.scaleY = 1) : e.select.active = !1, void 0 !== o.card2 && void 0 !== o.card2.card ? (e.card2.node.active = !0, e.card2.spriteFrame = cc.RedT.util.card.getCard(o.card2.card, o.card2.type)) : e.card2.node.active = !1) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    CaoThap_reels: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "858b3VPVxxI44+/QaauFb0O", "CaoThap_reels"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.card = [];
                var i = this;
                Promise.all([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(function(t, e) { var n = cc.instantiate(i.RedT.cardf); return n.width = 99.44, n.height = 141.68, i.node.addChild(n), n.getComponent(cc.Sprite) })).then(function(t) { e.card = t, e.random(!0) })
            },
            random: function(t) { void 0 === t && (t = !1), this.card.forEach(function(e, i) { t ? e.spriteFrame = 12 == i ? cc.RedT.util.card.cardB1 : cc.RedT.util.card.random() : 0 !== i && 12 !== i && (e.spriteFrame = cc.RedT.util.card.random()) }) },
            spin: function() {
                this.node.stopAllActions();
                var t = cc.moveTo(1, cc.v2(0, -(this.node.height - 141.68))).easing(cc.easeInOut(3)),
                    e = cc.callFunc(function() { this.card[12].spriteFrame = this.card[0].spriteFrame, this.node.y = 0 }, this),
                    i = cc.callFunc(function() { this.RedT.resumeGame(), this.RedT.addMainLog() }, this);
                this.node.runAction(cc.sequence(t, e, cc.delayTime(.1), i))
            },
            stop: function() { this.node.stopAllActions(), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    CaoThap_top_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "75624vu325ApKFOyOEfLajG", "CaoThap_top_item"), cc.Class({ extends: cc.Component, properties: { time: cc.Label, nick: cc.Label, cuoc: cc.Label, win: cc.Label, nohu: cc.Label } }), cc._RF.pop()
    }, {}],
    CaoThap_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4ae1dSPK8VEcrHS1zJqrH8e", "CaoThap_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            init: function(t) { this.RedT = t },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { caothap: { tops: this.red } } }) },
            onData: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("VQRed_history_item")).time.string = n.getStringDateByTime(t.time), i.phien.string = t.name, i.cuoc.string = n.numberWithCommas(t.goc), i.line.string = n.numberWithCommas(t.bet), i.win.string = t.a ? "N\u1ed4 H\u0168" : "TH\u1eaeNG L\u1edaN", i.node.children[0].active = !(1 & e), this.content.addChild(i.node)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    CaoThap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "300c3HqhRtJh4EmEiBIJq7G", "CaoThap");
        var n = t("Helper"),
            o = t("CaoThap_reels");
        cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, logs: cc.Node, reels: o, listA: { default: [], type: cc.Sprite }, ADemo: cc.SpriteFrame, buttonPlay: cc.Node, buttonAnNon: cc.Node, buttonCao: cc.Node, buttonThap: cc.Node, bet: cc.Node, notice: cc.Node, cardf: cc.Prefab, cuoc: "", hu: cc.Label, time: cc.Label, win: cc.Label, winUp: cc.Label, winDown: cc.Label, isPlay: !1 },
            init: function(t) { this.RedT = t, this.LichSu = t.Dialog.CaoThap_history, this.Top = t.Dialog.CaoThap_top, cc.RedT.setting.caothap = cc.RedT.setting.caothap || { scale: 1, cuoc: "1000", bet: "1000", logs: [] }, "true" == localStorage.getItem("caothap") && (this.node.active = !0), void 0 !== cc.RedT.setting.caothap.position && (this.node.position = cc.RedT.setting.caothap.position), void 0 !== cc.RedT.setting.caothap.cuoc && cc.RedT.setting.caothap.cuoc != this.cuoc && this.intChangerBet() },
            onLoad: function() { this.reels.init(this), cc.RedT.setting.caothap.isPlay && !this.isPlay && (this.isPlay = !0, this.onPlay(), this.resumeGame(), cc.RedT.setting.caothap.time_remain++, this.playTime(), setTimeout(function() { this.reels.card[this.reels.card.length - 1].spriteFrame = cc.RedT.util.card.getCard(cc.RedT.setting.caothap.card.card, cc.RedT.setting.caothap.card.type), this.reMainLog() }.bind(this), 100)) },
            onEnable: function() { this.onGetHu(), this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this), !cc.RedT.setting.caothap.connect && this.reconnect() },
            onDisable: function() { this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.caothap.position = this.node.position },
            openGame: function() { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("caothap", !0), this.setTop()) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { cc.RedT.audio.playUnClick(), this.node.active = !1, localStorage.setItem("caothap", !1) },
            setTop: function() { cc.RedT.setting.caothap.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            intChangerBet: function() { this.bet.children.forEach(function(t) { t.name === cc.RedT.setting.caothap.cuoc ? (this.cuoc = t.name, t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }.bind(this)) },
            changerBet: function(t) {
                if (this.isPlay) this.bet.children.forEach(function(t) { t.pauseSystemEvents() });
                else {
                    var e = t.target.name;
                    this.cuoc = cc.RedT.setting.caothap.cuoc = e, this.bet.children.forEach(function(t) { t.name === e ? (t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }), this.onGetHu()
                }
            },
            addNotice: function(t) {
                var e = cc.instantiate(this.RedT.prefabMiniNotice);
                e.getComponent("mini_warning").text.string = t, this.notice.addChild(e)
            },
            EF_Play: function() { this.reels.random(), this.reels.spin() },
            onPlay: function() { this.buttonPlay.active = !1, this.bet.children.forEach(function(t) { t.pauseSystemEvents() }) },
            offPlay: function() { this.isPlay = cc.RedT.setting.caothap.isPlay = !1, this.buttonPlay.active = !0, this.bet.children.forEach(function(t) { t.children[0].active && t.resumeSystemEvents() }), this.buttonAnNon.color = cc.color(155, 155, 155), this.buttonAnNon.pauseSystemEvents(), this.buttonCao.color = cc.color(155, 155, 155), this.buttonCao.pauseSystemEvents(), this.buttonThap.color = cc.color(155, 155, 155), this.buttonThap.pauseSystemEvents(), void 0 !== this.timeInterval && clearInterval(this.timeInterval) },
            onS1: function() { this.buttonAnNon.pauseSystemEvents(), this.buttonCao.pauseSystemEvents(), this.buttonThap.pauseSystemEvents() },
            onClickPlay: function() { this.isPlay || (this.isPlay = cc.RedT.setting.caothap.isPlay = !0, this.sendPlay(), this.onPlay(), this.reSetPhien()) },
            onData: function(t) { void 0 !== t.status && (1 === t.status ? (cc.RedT.setting.caothap.time_remain = 120, cc.RedT.setting.caothap.win = t.win, cc.RedT.setting.caothap.card = t.card, cc.RedT.setting.caothap.a = t.a, cc.RedT.setting.caothap.bet = t.bet, cc.RedT.setting.caothap.click = t.click, cc.RedT.setting.caothap.winUp = t.winUp, cc.RedT.setting.caothap.winDown = t.winDown, cc.RedT.setting.caothap.logs.push(t.card), void 0 !== t.nohu && (this.nohu = t.nohu), this.EF_Play(), this.playTime(), this.reels && this.reels.card && this.reels.card[0] ? this.reels.card[0].spriteFrame = cc.RedT.util.card.getCard(t.card.card, t.card.type) : setTimeout(function() { this.reels.card[0].spriteFrame = cc.RedT.util.card.getCard(t.card.card, t.card.type) }.bind(this), 10)) : this.offPlay()), void 0 !== t.annon && this.annon(t.annon), void 0 !== t.reconnect && this.connect(t.reconnect), void 0 !== t.isAnNon && this.eAnNon(t.isAnNon), void 0 !== t.down && this.eThapChanger(t.down), void 0 !== t.up && this.eCaoChanger(t.up), void 0 !== t.history && this.LichSu.onData(t.history), void 0 !== t.tops && this.Top.onData(t.tops), void 0 !== t.notice && this.addNotice(t.notice) },
            playTime: function() { void 0 !== this.timeInterval && clearInterval(this.timeInterval), this.timeInterval = setInterval(function() { cc.RedT.setting.caothap.time_remain > 0 ? this.time.string = n.numberToTime(cc.RedT.setting.caothap.time_remain) : clearInterval(this.timeInterval), cc.RedT.setting.caothap.time_remain-- }.bind(this), 1e3) },
            sendPlay: function() { cc.RedT.send({ g: { caothap: { play: { newGame: { cuoc: this.cuoc } } } } }) },
            selectGame: function(t, e) { this.onS1(), this.isPlay && cc.RedT.send({ g: { caothap: { play: { select: "1" == e } } } }) },
            onAnNon: function(t) { this.isPlay && cc.RedT.send({ g: { caothap: { play: { annon: !0 } } } }) },
            reconnect: function() { cc.RedT.setting.caothap.connect = !0, cc.RedT.send({ g: { caothap: { play: { reconnect: !0 } } } }) },
            connect: function(t) { this.onPlay(), this.cuoc != t.cuoc && (this.cuoc = cc.RedT.setting.caothap.cuoc = t.cuoc, this.intChangerBet()), this.isPlay = cc.RedT.setting.caothap.isPlay = !0, cc.RedT.setting.caothap.time_remain = t.time_remain, cc.RedT.setting.caothap.win = !0, cc.RedT.setting.caothap.card = t.card, cc.RedT.setting.caothap.a = t.a, cc.RedT.setting.caothap.bet = t.bet, cc.RedT.setting.caothap.click = t.click, cc.RedT.setting.caothap.winUp = t.winUp, cc.RedT.setting.caothap.winDown = t.winDown, this.listA.forEach(function(t, e) { void 0 !== cc.RedT.setting.caothap.a[e] ? t.spriteFrame = cc.RedT.util.card.getCard(cc.RedT.setting.caothap.a[e].card, cc.RedT.setting.caothap.a[e].type) : t.spriteFrame = this.ADemo }.bind(this)), setTimeout(function() { this.reels.card[this.reels.card.length - 1].spriteFrame = cc.RedT.util.card.getCard(cc.RedT.setting.caothap.card.card, cc.RedT.setting.caothap.card.type) }.bind(this), 10), this.playTime(), this.win.string = n.numberWithCommas(t.bet), this.winUp.string = t.winUp > 0 ? n.numberWithCommas(t.winUp) : "", this.winDown.string = t.winDown > 0 ? n.numberWithCommas(t.winDown) : "", this.clickInGame() },
            resumeGame: function() {
                if (this.win.string = n.numberWithCommas(cc.RedT.setting.caothap.bet), this.winUp.string = cc.RedT.setting.caothap.winUp > 0 ? n.numberWithCommas(cc.RedT.setting.caothap.winUp) : "", this.winDown.string = cc.RedT.setting.caothap.winDown > 0 ? n.numberWithCommas(cc.RedT.setting.caothap.winDown) : "", this.clickInGame(), this.listA.forEach(function(t, e) { void 0 !== cc.RedT.setting.caothap.a[e] ? t.spriteFrame = cc.RedT.util.card.getCard(cc.RedT.setting.caothap.a[e].card, cc.RedT.setting.caothap.a[e].type) : t.spriteFrame = this.ADemo }.bind(this)), cc.RedT.setting.caothap.win) {
                    if (this.nohu) {
                        var t = cc.instantiate(this.RedT.PrefabNoHu),
                            e = (t = t.getComponent(cc.Animation)).node.children[6].getComponent(cc.Label);
                        this.RedT.nodeEfect.addChild(t.node), t.on("play", function() {
                            var i = cc.callFunc(function() { cc.RedT.audio.playEf("winHu"), n.numberTo(e, 0, this.nohu, 1e3, !0) }, this);
                            t.node.runAction(cc.sequence(cc.delayTime(.25), i))
                        }, this), t.on("finished", function() { this.nohu = !1, this.offPlay(), t.node.destroy(), cc.RedT.setting.caothap.win = 0 }, this), t.play()
                    }
                } else this.offPlay(), this.addNotice("B\u1ea1n thua!! Ch\xfac b\u1ea1n may m\u1eafn l\u1ea7n sau.")
            },
            addMainLog: function() {
                var t = cc.instantiate(this.cardf);
                t.width = 36, t.height = 51.359, this.logs.addChild(t), (t = t.getComponent(cc.Sprite)).spriteFrame = cc.RedT.util.card.getCard(cc.RedT.setting.caothap.card.card, cc.RedT.setting.caothap.card.type)
            },
            reMainLog: function() {
                var t = this;
                Promise.all(cc.RedT.setting.caothap.logs.map(function(e) {
                    var i = cc.instantiate(t.cardf);
                    i.width = 36, i.height = 51.359, t.logs.addChild(i), (i = i.getComponent(cc.Sprite)).spriteFrame = cc.RedT.util.card.getCard(e.card, e.type)
                }))
            },
            annon: function(t) {
                clearInterval(this.timeInterval);
                var e = new cc.Node;
                e.addComponent(cc.Label), (e = e.getComponent(cc.Label)).string = "+" + n.numberWithCommas(t), e.font = cc.RedT.util.fontCong, e.lineHeight = 130, e.fontSize = 20, e.node.position = cc.v2(0, 10), this.notice.addChild(e.node), e.node.runAction(cc.sequence(cc.moveTo(3.5, cc.v2(0, 125)), cc.callFunc(function() { this.node.destroy() }, e)))
            },
            clickInGame: function() { this.eAnNon(cc.RedT.setting.caothap.click.isAnNon), this.eCaoChanger(cc.RedT.setting.caothap.click.up), this.eThapChanger(cc.RedT.setting.caothap.click.down) },
            eAnNon: function(t) { t ? (this.buttonAnNon.resumeSystemEvents(), this.buttonAnNon.color = cc.Color.WHITE) : (this.buttonAnNon.color = cc.color(155, 155, 155), this.buttonAnNon.pauseSystemEvents()) },
            eCaoChanger: function(t) { t ? (this.buttonCao.color = cc.Color.WHITE, this.buttonCao.resumeSystemEvents()) : (this.buttonCao.color = cc.color(155, 155, 155), this.buttonCao.pauseSystemEvents()) },
            eThapChanger: function(t) { t ? (this.buttonThap.color = cc.Color.WHITE, this.buttonThap.resumeSystemEvents()) : (this.buttonThap.color = cc.color(155, 155, 155), this.buttonThap.pauseSystemEvents()) },
            reSetPhien: function() { this.logs.destroyAllChildren(), cc.RedT.setting.caothap.logs = [] },
            newGame: function() { this.offPlay(), this.reels.stop(), cc.RedT.setting.caothap.connect = !1, this.reSetPhien() },
            onGetHu: function() {
                if (cc.RedT.setting.topHu && void 0 !== cc.RedT.setting.topHu.data && this.node.active) {
                    var t = cc.RedT.setting.topHu.data.caothap.filter(function(t) { return t.type == this.cuoc }.bind(this)),
                        e = n.getOnlyNumberInString(this.hu.string),
                        i = t[0].bet;
                    e - i != 0 && n.numberTo(this.hu, e, i, 2e3, !0)
                }
            }
        }), cc._RF.pop()
    }, { CaoThap_reels: "CaoThap_reels", Helper: "Helper" }],
    Card: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "550c9nAtbJCb6ippMUD/2+b", "Card"), cc.Class({ extends: cc.Component, properties: { card1: { default: [], type: cc.SpriteFrame }, card2: { default: [], type: cc.SpriteFrame }, card3: { default: [], type: cc.SpriteFrame }, card4: { default: [], type: cc.SpriteFrame }, card5: { default: [], type: cc.SpriteFrame }, card6: { default: [], type: cc.SpriteFrame }, card7: { default: [], type: cc.SpriteFrame }, card8: { default: [], type: cc.SpriteFrame }, card9: { default: [], type: cc.SpriteFrame }, card10: { default: [], type: cc.SpriteFrame }, card11: { default: [], type: cc.SpriteFrame }, card12: { default: [], type: cc.SpriteFrame }, card13: { default: [], type: cc.SpriteFrame }, cardB1: { default: null, type: cc.SpriteFrame }, cardB2: { default: null, type: cc.SpriteFrame }, red: !1 }, init: function() { this.card = [this.card1, this.card2, this.card3, this.card4, this.card5, this.card6, this.card7, this.card8, this.card9, this.card10, this.card11, this.card12, this.card13] }, config: function() { void 0 === cc.RedT.util.card && (cc.RedT.util.card = this, this.red || (this.red = !0, this.init())) }, getCard: function(t, e) { return void 0 === t && (t = 0), void 0 === e && (e = 0), this.card[t][e] }, random: function(t) { return void 0 === t && (t = 13), this.card[~~(Math.random() * t)][~~(4 * Math.random())] } }), cc._RF.pop()
    }, {}],
    CheckOut: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3988dLBD7VPLowq6ozkuvOs", "CheckOut"), cc.Class({ extends: cc.Sprite, properties: { BgOn: { default: null, type: cc.SpriteFrame }, BgOff: { default: null, type: cc.SpriteFrame }, isChecked: !1 }, onLoad: function() { this.OnUpdate() }, OnChangerClick: function() { this.isChecked = !this.isChecked, this.OnUpdate() }, OnUpdate: function() { this.isChecked ? this.spriteFrame = this.BgOn : this.spriteFrame = this.BgOff } }), cc._RF.pop()
    }, {}],
    ChuyenRed_daily: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c1af2XufuNBepY7+fdeCQxa", "ChuyenRed_daily"), cc.Class({
            extends: cc.Component,
            properties: { bg: cc.Node, STT: cc.Label, DaiLy: cc.Label, NICKNAME: cc.Label, Phone: cc.Label, Location: cc.Label, vip1: cc.Node, vip2: cc.Node, vip3: cc.Node, FB: "", Zalo: "", Telegram: "" },
            init: function(t, e, i) {
                if (this.controll = t, this.STT.string = i + 1, this.DaiLy.string = e.name, this.NICKNAME.string = e.nickname, this.Phone.string = e.phone, this.Location.string = e.location, this.FB = "https://m.me/" + e.fb, this.Zalo = "https://zalo.me/" + e.zalo, this.Telegram = "https://t.me/" + e.tele, 0 == i && e.vip > 0) {
                    this.vip1.active = !0;
                    var n = new cc.Color(247, 237, 16);
                    this.DaiLy.node.color = n
                }
                if (1 == i && e.vip > 0) {
                    this.vip2.active = !0;
                    n = new cc.Color(228, 228, 228);
                    this.DaiLy.node.color = n
                }
                if (2 == i && e.vip > 0) {
                    this.vip3.active = !0;
                    n = new cc.Color(247, 192, 16);
                    this.DaiLy.node.color = n
                }
            },
            onChuyenClick: function() { cc.RedT.audio.playClick(), this.controll.selectDaiLy(this) },
            onFBClick: function() { cc.sys.openURL(this.FB, "_blank") },
            onZaloClick: function() { cc.sys.openURL(this.Zalo, "_blank") },
            onTeleClick: function() { cc.sys.openURL(this.Telegram, "_blank") }
        }), cc._RF.pop()
    }, {}],
    ChuyenRed: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "45856xdHLFHNqyaZPpjF/pA", "ChuyenRed");
        var n = t("BrowserUtil"),
            o = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { nickname: cc.EditBox, red: cc.EditBox, messenger: cc.EditBox, otp: cc.EditBox, redPhi: cc.Label, rednhan: cc.Label, shop: cc.Node, isdaily: !1, meDaily: !1 },
            init: function(t) {
                this.RedT = t;
                var e = this;
                this.editboxs = [this.nickname, this.red, this.messenger, this.otp], this.keyHandle = function(t) { return t.keyCode === cc.macro.KEY.tab ? (e.isTop() && e.changeNextFocusEditBox(), t.preventDefault && t.preventDefault(), !1) : t.keyCode === cc.macro.KEY.enter ? (n.focusGame(), e.onChuyenClick(), t.preventDefault && t.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { this.reCheckMeDL(), cc.sys.isBrowser && this.addEvent(), this.RedT.DaiLy.loadDaiLy() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onChuyenClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.nickname.string = this.red.string = this.messenger.string = this.rednhan.string = this.redPhi.string = "" },
            onChuyenClick: function() {
                var t = null;
                if (o.isEmpty(this.nickname.string) || o.isEmpty(this.red.string) ? t = "Ki\u1ec3m tra l\u1ea1i c\xe1c th\xf4ng tin..." : o.isEmpty(this.nickname.string) ? t = "T\xean nh\xe2n v\u1eadt kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng" : o.getOnlyNumberInString(this.red.string) < 1e4 ? t = "S\u1ed1 ti\u1ec1n chuy\u1ec3n t\u1ed1i thi\u1ec3u l\xe0 10.000 Gold." : o.isEmpty(this.otp.string) && (t = "Vui l\xf2ng nh\u1eadp m\xe3 OTP."), t) cc.RedT.inGame.notice.show({ title: "CHUY\u1ec2N Gold", text: t });
                else {
                    var e = { name: this.nickname.string, red: o.getOnlyNumberInString(this.rednhan.string), otp: this.otp.string };
                    o.isEmpty(this.messenger.string.trim()) || (e = Object.assign(e, { message: this.messenger.string })), cc.RedT.send({ shop: { chuyen_red: e } })
                }
            },
            reCheckMeDL: function() {
                if (this.meDaily = !1, this.RedT.DaiLy.daily_list.length) {
                    var t = new RegExp("^" + cc.RedT.user.name + "$", "i");
                    this.RedT.DaiLy.daily_list.forEach(function(e) {!this.meDaily && (this.meDaily = t.test(e.NICKNAME.string)) }.bind(this))
                }
            },
            selectDaiLy: function(t) { this.isdaily = !0, this.nickname.string = t.NICKNAME.string, this.onChangerRed(0, !0), this.RedT.onSelectHead(null, "ChuyenRed"), this.dailyStatus() },
            onChangerNick: function(t) { this.isdaily = !1, this.RedT.DaiLy.daily_list.length > 0 && this.RedT.DaiLy.daily_list.forEach(function(e) { new RegExp("^" + t + "$", "i").test(e.NICKNAME.string) && (this.isdaily = !0) }.bind(this)), this.onChangerRed(0, !0), this.dailyStatus() },
            onChangerRed: function(t, e) {
                if (void 0 === t && (t = 0), void 0 === e && (e = !1), t = e ? this.red.string : t, t = o.numberWithCommas(o.getOnlyNumberInString(t)), this.red.string = 0 == t ? "" : t, this.isdaily || this.meDaily) this.rednhan.string = t, this.redPhi.string = 0;
                else {
                    var i = o.getOnlyNumberInString(t),
                        n = Math.floor(i),
                        c = Math.ceil(0 * i / 100);
                    this.redPhi.string = o.numberWithCommas(c), this.rednhan.string = o.numberWithCommas(n + c)
                }
            },
            dailyStatus: function() { this.isdaily ? this.shop.active = !0 : this.shop.active = !1 },
            onClickOTP: function() { cc.RedT.send({ otp: !0 }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    CoTrang_bonus_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0023dJWKJFJOZXuKmK/mqIT", "CoTrang_bonus_item"), cc.Class({ extends: cc.Component, properties: { open: cc.Node, close: cc.Node, text: cc.Label } }), cc._RF.pop()
    }, {}],
    CoTrang_dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "88434zB0LpByrbi+FeJkV/o", "CoTrang_dialog");
        var n = t("CoTrang_history"),
            o = t("CoTrang_top");
        cc.Class({ extends: cc.Component, properties: { history: n, top: o, help: cc.Node }, init: function() { this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showHistory: function() { this.node.active = this.history.node.active = !0, this.objShow = this.history.node }, showTop: function() { this.node.active = this.top.node.active = !0, this.objShow = this.top.node }, showHelp: function() { this.node.active = this.help.active = !0, this.objShow = this.help } }), cc._RF.pop()
    }, { CoTrang_history: "CoTrang_history", CoTrang_top: "CoTrang_top" }],
    CoTrang_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "89676Zx8oRO4KIzkpkCy5Hq", "CoTrang_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, red: !0 },
            onLoad: function() {
                var t = this,
                    e = cc.instantiate(this.page);
                e.y = -232, this.node.addChild(e), this.page = e.getComponent("Pagination"), Promise.all(this.content.children.map(function(t) { return t.getComponent("VQRed_history_item") })).then(function(e) { t.content = e }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { longlan: { log: { red: this.red, page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), Promise.all(this.content.map(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.cuoc.string = n.numberWithCommas(o.bet), e.win.string = o.line + " D\xf2ng", e.line.string = n.numberWithCommas(o.win)) : e.node.active = !1
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    CoTrang_iline: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "846ba+ck/5Ez62leZJ7v614", "CoTrang_iline"), cc.Class({ extends: cc.Component, properties: { line: cc.Node, ef: !1 }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onShow: function() { this.line.active = !0 }, onHidden: function() {!this.ef && (this.line.active = !1) } }), cc._RF.pop()
    }, {}],
    CoTrang_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fcb34krtXlN66KnmT4HIAyT", "CoTrang_item"), cc.Class({ extends: cc.Component, properties: { icon: cc.Sprite, free: cc.Node, bonus: cc.Node, hu: cc.Node, wind: cc.Node }, init: function(t) { this.RedT = t }, random: function() { var t = 11 * Math.random() >> 0; return this.setIcon(t), t }, setIcon: function(t, e) { void 0 === e && (e = !1), 10 == t ? (this.wind.active = !0, this.icon.node.active = this.free.active = this.bonus.active = this.hu.active = !1) : 9 == t ? (this.hu.active = !0, this.icon.node.active = this.free.active = this.bonus.active = this.wind.active = !1) : 8 == t ? (this.bonus.active = !0, this.icon.node.active = this.free.active = this.wind.active = this.hu.active = !1) : 7 == t ? (this.free.active = !0, this.icon.node.active = this.wind.active = this.bonus.active = this.hu.active = !1) : (this.icon.node.active = !0, this.icon.spriteFrame = this.RedT.icons[t], this.free.active = this.wind.active = this.bonus.active = this.hu.active = !1), e && (this.data = t) } }), cc._RF.pop()
    }, {}],
    CoTrang_lines: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f0cc25QW1BBlrdxfkZq24z5", "CoTrang_lines");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { lines: cc.Node, mainLines: cc.Node },
            init: function(t) {
                var e = this;
                this.RedT = t;
                Promise.all(this.mainLines.children.map(function(t) { return t.getComponent("CoTrang_iline") })).then(function(t) { e.mainLines = t }), this.selectAll(null, "1")
            },
            onOpen: function() { this.node.active = !0 },
            onClose: function() { this.RedT.playClick(), this.node.active && this.data.length < 1 ? this.RedT.notice.show({ title: "C\u1ea2NH B\xc1O", text: "Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng" }) : this.node.active = !1 },
            select: function(t) {
                this.RedT.playClick();
                var e = t.target;
                e.color._val != cc.Color.WHITE._val ? e.color = cc.Color.WHITE : e.color = e.color.fromHEX("#8A8A8A"), this.check()
            },
            check: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) { return t.color._val == cc.Color.WHITE._val ? e + 1 : void 0 })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectChan: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (!(i % 2)) return t.color = cc.Color.WHITE, i;
                    t.color = t.color.fromHEX("#8A8A8A")
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectLe: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (i % 2) return t.color = cc.Color.WHITE, i;
                    t.color = t.color.fromHEX("#8A8A8A")
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectAll: function(t, e) {
                var i = this;
                Promise.all(this.lines.children.map(function(t, i) { var n = "1" == e; return t.color = n ? cc.Color.WHITE : t.color.fromHEX("#8A8A8A"), n ? i + 1 : void 0 })).then(function(t) { Promise.all(t.filter(function(t, e) { return void 0 !== t })).then(function(t) { i.data = t, i.RedT.labelLine.string = t.length, i.RedT.tong.string = n.numberWithCommas(t.length * n.getOnlyNumberInString(i.RedT.bet.string)) }) })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    CoTrang_playBonus: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9c69cVyCZJIH59jXRxl6d7F", "CoTrang_playBonus");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { numberBonus: cc.Label, listBox: cc.Node, notice: cc.Node, numberWin: cc.Label, icons: { default: [], type: cc.SpriteFrame } },
            init: function(t) {
                var e = this;
                this.RedT = t, Promise.all(this.listBox.children.map(function(t) { return t.getComponent("CoTrang_bonus_item") })).then(function(t) { e.listBox = t })
            },
            onPlay: function(t) { this.reset(), this.node.active = !0, this.numberBonus.string = t },
            onClickBox: function(t) { this.numberBonus.string && (this.RedT.playClick(), this.onSend(t.target.name)) },
            closeNotice: function() { this.notice.active = this.node.active = !1, this.RedT.hieuUng() },
            onData: function(t) {
                if (void 0 !== t.box) {
                    var e = this.listBox[t.box];
                    e.open.active = !0, e.close.active = !1, e.text.string = n.numberWithCommas(t.bet), this.numberBonus.string = t.bonus
                }
                void 0 !== t.win && (this.notice.active = !0, this.numberWin.string = n.numberWithCommas(t.win), this.RedT.vuathang.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.RedT.vuathang.string) + t.win))
            },
            onSend: function(t) { cc.RedT.send({ g: { longlan: { bonus: { box: t } } } }) },
            reset: function() { Promise.all(this.listBox.map(function(t) { t.open.active = !1, t.close.active = !0, t.text.string = "" })) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    CoTrang_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "46703d92yxJ94jTBiM3fuuV", "CoTrang_reel"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = this,
                    n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                Promise.all(n.map(function(t, e) { var o = cc.instantiate(i.RedT.icon); return i.node.addChild(o), (o = o.getComponent("CoTrang_item")).init(i.RedT), e > 2 && e < n.length - 3 && o.random(), o })).then(function(t) { e.icons = t, e.icons[e.icons.length - 1].setIcon(e.icons[4].random()), e.icons[e.icons.length - 2].setIcon(e.icons[3].random()), e.icons[e.icons.length - 3].setIcon(e.icons[2].random()), e.icons[e.icons.length - 4].setIcon(e.icons[1].random()), e.icons[e.icons.length - 5].setIcon(e.icons[0].random()) })
            },
            spin: function(t) {
                this.node.stopAllActions();
                var e = cc.moveTo(1, cc.v2(this.node.x, -(this.node.height - 396))).easing(cc.easeInOut(3)),
                    i = cc.callFunc(function() { 0 === t && this.RedT.copy(), this.node.y = 0 }, this);
                if (4 === t) {
                    var n = cc.callFunc(function() { this.RedT.EF_vuathang(), this.node.y = 0, this.RedT.random(), this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, n))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, i))
            },
            stop: function() { this.node.stopAllActions(), this.RedT.copy(), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    CoTrang_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c630b0qZgVLe76291zEptTX", "CoTrang_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { longlan: { top: this.red } } }) },
            onData: function(t) {
                this.content.destroyAllChildren();
                var e = this;
                Promise.all(t.map(function(t, i) {
                    var o = cc.instantiate(e.item),
                        c = o.getComponent("VQRed_history_item");
                    c.time.string = n.getStringDateByTime(t.time), c.phien.string = t.name, c.cuoc.string = n.numberWithCommas(t.bet), c.line.string = n.numberWithCommas(t.win), c.win.string = 2 === t.type ? "N\u1ed5 H\u0169" : "Th\u1eafng l\u1edbn", o.children[0].active = !(1 & i), e.content.addChild(o)
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    CoTrang: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d4343ucEwlPPaNvLP9L/Oj8", "CoTrang");
        var n = t("Helper"),
            o = t("CoTrang_reel"),
            c = t("CoTrang_lines"),
            s = t("CoTrang_playBonus"),
            a = t("Notice"),
            h = t("CoTrang_dialog");
        cc.Class({
            extends: cc.Component,
            properties: { gameBonus: s, audioClickSpin: { default: null, type: cc.AudioClip }, audioClick: { default: null, type: cc.AudioClip }, audioWin: { default: null, type: cc.AudioClip }, audioBigWin: { default: null, type: cc.AudioClip }, audioJackpot: { default: null, type: cc.AudioClip }, redhat: cc.Node, reels: { default: [], type: o }, icon: cc.Prefab, icons: { default: [], type: cc.SpriteFrame }, betString: { default: [], type: cc.String }, audioIcons: { default: [], type: cc.SpriteFrame }, audioIcon: cc.Sprite, nodeRed: cc.Node, nodeXu: cc.Node, nodeNotice: cc.Node, prefabNotice: cc.Prefab, loading: cc.Node, notice: a, dialog: h, Line: c, hu: cc.Label, taikhoan: cc.Label, tong: cc.Label, vuathang: cc.Label, labelLine: cc.Label, bet: cc.Label, freeLabel: cc.Label, phien: cc.Label, BigWin: cc.Animation, BigWin_Label: cc.Label, NoHu_close: cc.Node, NoHu: cc.Animation, NoHu_Label: cc.Label, EF_Bonus: cc.Animation, EF_Free: cc.Animation, buttonCoint: cc.Node, buttonLine: cc.Node, buttonSpin: cc.Node, buttonBet: cc.Node, buttonAuto: cc.Node, isAuto: !1, isSpin: !1, isFreeSpin: !1, red: !0, betSelect: 0 },
            onLoad: function() { cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat, this.Line.init(this), cc.RedT.audio.bg.pause(), cc.RedT.audio.bg = cc.RedT.audio.bgSlot2, this.BigWin.on("finished", this.BigWinFinish, this), this.BigWin.on("play", this.BigWinPlay, this), this.EF_Free.on("finished", this.EF_FreeFinish, this), this.NoHu.on("play", this.NoHuPlay, this), this.EF_Bonus.on("finished", this.EF_BonusFinish, this), this.gameBonus.init(this), this.dialog.init(), this.reels.forEach(function(t) { t.init(this) }.bind(this)), cc.RedT.send({ scene: "longlan" }), this.taikhoan.string = n.numberWithCommas(cc.RedT.user.red), this.speed = 400, cc.RedT.isSoundBackground() ? (cc.RedT.audio.bg.play(), this.audioIcon.spriteFrame = this.audioIcons[1]) : this.audioIcon.spriteFrame = this.audioIcons[0] },
            _playSFX: function(t) { cc.RedT.IS_SOUND && cc.audioEngine.playEffect(t, !1) },
            playClick: function() { this._playSFX(this.audioClick) },
            BigWinPlay: function() {
                var t = cc.callFunc(function() { this._playSFX(this.audioBigWin), n.numberTo(this.BigWin_Label, 0, this.H_win, 2e3, !0) }, this);
                this.BigWin.node.runAction(cc.sequence(cc.delayTime(.3), t))
            },
            BigWinFinish: function() { this.isBigWin = !1, this.BigWin.node.active = !1, this.BigWin_Label.string = "", this.showLineWin(!1), this.hieuUng() },
            NoHuPlay: function() {
                this.NoHu_Label.string = "";
                var t = cc.callFunc(function() { this._playSFX(this.audioJackpot), n.numberTo(this.NoHu_Label, 0, this.H_win, 2e3, !0) }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(.3), t));
                var e = cc.callFunc(function() { this.NoHu_close.active = !0 }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(4), e))
            },
            NoHuFinish: function() { this.isNoHu = !1, this.isAuto && this.onAuto(), this.showLineWin(!1), this.hieuUng() },
            NoHuClose: function() { this.NoHu.node.active = this.NoHu_close.active = !1, this.NoHuFinish() },
            EF_BonusFinish: function() { this.EF_Bonus.node.active = !1, this.gameBonus.onPlay(this.isBonus), this.isBonus = 0, this.showLineWin(!1) },
            EF_FreeFinish: function() { this.isFree = !1, this.EF_Free.node.active = !1, this.showLineWin(!1), this.hieuUng() },
            onData: function(t) { void 0 !== t.user && (this.userData(t.user), cc.RedT.userData(t.user)), void 0 !== t.longlan && this.LongLan(t.longlan), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu, this.onGetHu()), void 0 !== t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            userData: function(t) { this.taikhoan.string = n.numberWithCommas(t.red) },
            LongLan: function(t) { void 0 !== t.status && (1 === t.status ? (t.cel.forEach(function(t, e) { t.forEach(function(t, i) { this.reels[e].icons[i].setIcon(t, !0) }.bind(this)) }.bind(this)), this.runReels(), this.H_line_win = t.line_win, this.H_win = t.win, this.H_free = t.free, this.isBonus = t.isBonus, this.isNoHu = t.isNoHu, this.isBigWin = t.isBigWin, this.isFree = t.isFree, this.isFreeSpin = !!t.free) : this.resetSpin()), t.phien && (this.phien.string = "#" + t.phien), t.bonus && this.gameBonus.onData(t.bonus), t.log && this.dialog.history.onData(t.log), t.top && this.dialog.top.onData(t.top), t.notice && this.addNotice(t.notice) },
            EF_vuathang: function() { this.showLineWin(!0), this.vuathang.string = n.numberWithCommas(this.H_win), this.buttonSpin.active = !this.H_free, this.freeLabel.string = "Free: " + this.H_free, this.freeLabel.node.active = !!this.H_free },
            onLineWin: function(t) {
                this.H_line_win.forEach(function(e) {
                    var i = this.Line.mainLines[e.line - 1];
                    t ? (i.ef = !0, i.onShow()) : (i.ef = !1, i.onHidden())
                }.bind(this))
            },
            showLineWin: function(t) { this.onLineWin(t), t || this.isNoHu || this.isBigWin || this.isAuto || this.isFreeSpin || (this.eflineN = 0, this.efLineWin()) },
            efLineWin: function(t) {
                if (this.H_line_win.length) {
                    this.node.stopAllActions(), void 0 === this.H_line_win[this.eflineN] && (this.eflineN = 0), this.efOneLineWin(this.eflineN, !0);
                    var e = cc.callFunc(function() { this.efOneLineWin(this.eflineN, !1), this.eflineN += 1, this.efLineWin() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(1.5), e))
                }
            },
            efOneLineWin: function(t, e) {
                t = this.H_line_win[this.eflineN].line;
                var i = this.Line.mainLines[t - 1];
                e ? (i.ef = !0, i.onShow()) : (i.ef = !1, i.onHidden())
            },
            hieuUng: function() {
                if (this.isBigWin && !this.isNoHu) this.BigWin.node.active = !0, this.BigWin.play(), this.oldBigWin = !0;
                else if (this.isNoHu) this.NoHu.node.active = !0, this.NoHu.play();
                else if (this.isBonus) this.EF_Bonus.node.active = !0, this.EF_Bonus.play(), cc.RedT.audio.playEf("bonus");
                else if (this.isFree) this.EF_Free.node.active = !0, this.EF_Free.play();
                else if (this.H_win > 0) {
                    var t = new cc.Node;
                    t.addComponent(cc.Label), (t = t.getComponent(cc.Label)).string = "+" + n.numberWithCommas(this.H_win), t.font = cc.RedT.util.fontCong, t.lineHeight = 130, t.fontSize = 25, t.node.position = cc.v2(0, 21), this.nodeNotice.addChild(t.node), !this.oldBigWin && this._playSFX(this.audioWin), t.node.runAction(cc.sequence(cc.moveTo(1.2, cc.v2(0, 105)), cc.callFunc(function() { this.speed = 0, t.node.destroy(), this.hieuUng(), this.showLineWin(!1) }, this))), this.H_win = 0, this.oldBigWin = !1
                } else this.isAuto || this.isFreeSpin ? this.timeOut = setTimeout(function() { this.onAutoSpin(), this.speed = 400 }.bind(this), this.speed) : this.resetSpin()
            },
            onChangerBet: function() { this._playSFX(this.audioClick), this.betSelect++, this.betSelect > 2 && (this.betSelect = 0), this.bet.string = this.betString[this.betSelect], this.tong.string = n.numberWithCommas(this.Line.data.length * n.getOnlyNumberInString(this.bet.string)), this.onGetHu() },
            onClickAuto: function() { this._playSFX(this.audioClick), this.onAuto() },
            onAuto: function() { this.isAuto = !this.isAuto, this.isAuto ? this.buttonAuto.color = cc.Color.WHITE : this.buttonAuto.color = this.buttonAuto.color.fromHEX("#8A8A8A") },
            onClickSpin: function() { this.onSpin() },
            onAutoSpin: function() { this._playSFX(this.audioClickSpin), this.onGetSpin() },
            onSpin: function() { this.Line.data.length < 1 ? this.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : this.isSpin || (this._playSFX(this.audioClickSpin), this.node.stopAllActions(), void 0 !== this.eflineN && void 0 !== this.H_line_win && this.H_line_win.length && this.efOneLineWin(this.eflineN, !1), this.eflineO = this.eflineN = 0, this.isSpin = !0, this.setSpin(), this.onGetSpin()) },
            setSpin: function() { this.buttonLine.pauseSystemEvents(), this.buttonSpin.pauseSystemEvents(), this.buttonCoint.pauseSystemEvents(), this.buttonBet.pauseSystemEvents() },
            resetSpin: function() { this.isAuto && this.onAuto(), this.isSpin = !1, this.buttonLine.resumeSystemEvents(), this.buttonSpin.resumeSystemEvents(), this.buttonCoint.resumeSystemEvents(), this.buttonBet.resumeSystemEvents() },
            runReels: function() { this.reels.forEach(function(t, e) { t.spin(e) }) },
            copy: function() { this.reels.forEach(function(t) { t.icons[t.icons.length - 1].setIcon(t.icons[2].data), t.icons[t.icons.length - 2].setIcon(t.icons[1].data), t.icons[t.icons.length - 3].setIcon(t.icons[0].data) }) },
            random: function() { this.reels.forEach(function(t) { t.icons.forEach(function(e, i) { i > 2 && i < t.icons.length - 3 && e.random() }) }) },
            onGetSpin: function() { cc.RedT.send({ g: { longlan: { spin: { cuoc: n.getOnlyNumberInString(this.bet.string), line: this.Line.data } } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.nodeNotice.addChild(e)
            },
            backGame: function() { cc.RedT.MiniPanel.node.parent = null, this.loading.active = !0, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame") },
            signOut: function() { cc.RedT.MiniPanel.node.parent = null, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            onGetHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    var e = n.getOnlyNumberInString(this.bet.string);
                    Promise.all(cc.RedT.setting.topHu.data.long.filter(function(t) { return t.type == e })).then(function(e) {
                        var i = n.getOnlyNumberInString(t.hu.string),
                            o = e[0].bet;
                        i - o != 0 && n.numberTo(t.hu, i, o, 2e3, !0)
                    })
                }
            },
            onSetAudio: function() { cc.RedT.isSoundBackground() ? (cc.RedT.setSoundBackground(!1), cc.RedT.audio.bg.pause(), cc.RedT.IS_SOUND = !1, cc.RedT.setSoundGame(!1), this.audioIcon.spriteFrame = this.audioIcons[0]) : (cc.RedT.setSoundBackground(!0), cc.RedT.audio.bg.play(), cc.RedT.IS_SOUND = !0, cc.RedT.setSoundGame(!0), this.audioIcon.spriteFrame = this.audioIcons[1]) }
        }), cc._RF.pop()
    }, { CoTrang_dialog: "CoTrang_dialog", CoTrang_lines: "CoTrang_lines", CoTrang_playBonus: "CoTrang_playBonus", CoTrang_reel: "CoTrang_reel", Helper: "Helper", Notice: "Notice" }],
    CodePay_itembank: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e237f/YInNJkLPQN6RfG76C", "CodePay_itembank"), cc.Class({ extends: cc.Component, properties: { background: { default: null, type: cc.Node }, text: { default: null, type: cc.Label }, value: "" }, init: function(t, e, i, n, o) { void 0 === o && (o = null), this.controll = t, this.local_arg = e, this.local_text = i, this.local_value = n, null !== o && (this.local_click = o) }, onClickChanger: function() { cc.RedT.audio.playClick(), this.controll[this.local_text].string = this.text.string, this.controll[this.local_value] = this.value, this.controll[this.local_arg].forEach(function(t) { t === this ? t.onSelect() : t.unSelect() }.bind(this)), this.controll.backT && this.controll.backT(this.data), void 0 !== this.local_click && this.controll[this.local_click](this) }, onSelect: function() { this.background.active = !0, this.node.pauseSystemEvents() }, unSelect: function() { this.background.active = !1, this.node.resumeSystemEvents() } }), cc._RF.pop()
    }, {}],
    CodePay: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a6c6bpsGrFG1Zzc7vD9swZL", "CodePay");
        var n = function(t) { return t && t.__esModule ? t : { default: t } }(t("../../../../Util/Http"));
        var o = t("BrowserUtil"),
            c = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { labelBank: cc.Label, labelNumber: cc.Label, labelName: cc.Label, labelBranch: cc.Label, labelNickname: cc.Label, moreBank: cc.Node, scrollviewBank: { default: null, type: cc.ScrollView }, prefab: cc.Prefab, isLoad: !1, inputTien: cc.EditBox, codeNode: cc.Node, lableCode: cc.Label, remainTime: cc.Label, btnCreateCode: cc.Node, btnCancelCode: cc.Node, hinhThuc: "", valueBank: "", chargeId: "" },
            onLoad: function() {
                this.isLoad || this.getBankList();
                var t = this;
                this.editboxs = [this.inputTien], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.isTop() && t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (o.focusGame(), t.onNapClick(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            getBankList: function() {
                var t = this;
                cc.RedT.inGame.loading.active = !0, n.default.get("https://api.zon.vin/autocode/getAllBank/", {}, function(e, i) { cc.RedT.inGame.loading.active = !1, null == e && (1 == i.stt ? t.onData(i.data) : cc.RedT.inGame.notice.show({ title: "CODE PAY", text: "Kh\xf4ng k\u1ebft n\u1ed1i \u0111\u01b0\u1ee3c \u0111\u1ebfn h\u1ec7 th\u1ed1ng code pay" })) })
            },
            callCreateCode: function() {
                var t = this;
                cc.RedT.inGame.loading.active = !0;
                var e = c.getOnlyNumberInString(this.inputTien.string),
                    i = this.valueBank,
                    o = cc.RedT.user.id;
                n.default.get("https://api.zon.vin/autocode/createCode/", { UID: o, chargeType: "bank", amount: e, subType: i }, function(e, i) { cc.RedT.inGame.loading.active = !1, null == e && (1 == i.stt ? t.showCodeData(i.data) : -1 == i.stt ? cc.RedT.inGame.notice.show({ title: "CODE PAY", text: "Kh\xf4ng t\xecm th\u1ea5y th\xf4ng tin t\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n \n Vui l\xf2ng c\u1eadp nh\u1eadp version m\u1edbi" }) : cc.RedT.inGame.notice.show({ title: "CODE PAY", text: "Code pay l\u1ed7i ho\u1eb7c vui l\xf2ng ch\u1ecdn ng\xe2n h\xe0ng kh\xe1c" })) })
            },
            callCancelCode: function() {
                var t = this;
                cc.RedT.inGame.loading.active = !0, n.default.get("https://api.zon.vin/autocode/cancelCode/", { id: this.chargeId }, function(e, i) { cc.RedT.inGame.loading.active = !1, null == e && (1 == i.stt ? (t.expireCodeData(), cc.RedT.inGame.notice.show({ title: "N\u1ea0P ZON", text: "B\u1ea1n \u0111\xe3 hu\u1ef7 l\u1ec7nh n\u1ea1p th\xe0nh c\xf4ng" })) : cc.RedT.inGame.notice.show({ title: "CODE PAY", text: "Code pay l\u1ed7i ho\u1eb7c vui l\xf2ng ch\u1ecdn ng\xe2n h\xe0ng kh\xe1c" })) })
            },
            onEnable: function() { "" != this.chargeId && (this.getBankList(), this.expireCodeData()), cc.sys.isBrowser && this.addEvent() },
            onDisable: function() { this.moreBank.active = !1, cc.sys.isBrowser && this.removeEvent(), this.clean() },
            showCodeData: function(t) { this.codeNode.active = !0, this.lableCode.string = t.code, this.labelNickname.string = t.code, this.labelName.string = t.phoneName, this.labelNumber.string = t.phoneNum, this.btnCreateCode.active = !1, this.btnCancelCode.active = !0, this.chargeId = t.id, this.progressCountdown(t.timeToExpired) },
            expireCodeData: function() { this.codeNode.active = !1, this.lableCode.string = "-", this.labelNickname.string = "-", this.labelName.string = "H\xe3y t\u1ea1o code", this.labelNumber.string = "H\xe3y t\u1ea1o code", this.btnCreateCode.active = !0, this.btnCancelCode.active = !1, this.remainTime.string = "\u0110\xe3 h\u1ebft h\u1ea1n", this.chargeId = "", this.valueBank = "", this.labelBank.string = "Ch\u1ecdn ng\xe2n h\xe0ng" },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) o.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) o.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onNapClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (o.checkEditBoxFocus(this.editboxs[e])) { o.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && o.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.isLoad = !1 },
            toggleMoreBank: function() { "" != this.chargeId ? cc.RedT.inGame.notice.show({ title: "N\u1ea0P ZON", text: "H\xe3y ho\xe0n th\xe0nh m\xe3 l\u1ec7nh b\u1ea1n \u0111\xe3 t\u1ea1o \n ho\u1eb7c hu\u1ef7 m\xe3 \u0111\u1ec3 thay \u0111\u1ed5i ng\xe2n h\xe0ng" }) : this.moreBank.active = !this.moreBank.active },
            onData: function(t) {
                this.isLoad = !0, t.length > 0 && (this.i_arg = t.map(function(t, e) {
                    var i = cc.instantiate(this.prefab),
                        n = i.getComponent("CodePay_itembank");
                    return n.init(this, "i_arg", "labelBank", "valueBank"), n.text.string = t.name, n.value = t.code, this.scrollviewBank.content.addChild(i), n.data = t, n
                }.bind(this)))
            },
            backT: function(t) { this.labelBank.string = t.name, this.valueBank = t.code, this.toggleMoreBank() },
            onChangerRed: function(t) { void 0 === t && (t = 0), t = c.numberWithCommas(c.getOnlyNumberInString(t)), this.inputTien.string = 0 == t ? "" : t },
            onClickNap: function() { this.valueBank.length ? c.getOnlyNumberInString(this.inputTien.string) >> 0 < 5e4 ? cc.RedT.inGame.notice.show({ title: "N\u1ea0P ZON", text: "N\u1ea1p t\u1ed1i thi\u1ec3u 50.000, t\u1ed1i \u0111a 1.000.000.000" }) : this.callCreateCode() : cc.RedT.inGame.notice.show({ title: "N\u1ea0P ZON", text: "Vui l\xf2ng ch\u1ecdn ng\xe2n h\xe0ng mu\u1ed1n n\u1ea1p." }) },
            onCopyNumber: function() { cc.RedT.CopyToClipboard(this.labelNumber.string), cc.RedT.inGame.noticeCopy() },
            onCopyName: function() { cc.RedT.CopyToClipboard(this.labelName.string), cc.RedT.inGame.noticeCopy() },
            onCopyBranch: function() { cc.RedT.CopyToClipboard(this.labelBranch.string), cc.RedT.inGame.noticeCopy() },
            onCopyNoiDung: function() { cc.RedT.CopyToClipboard(this.labelNickname.string), cc.RedT.inGame.noticeCopy() },
            fancyTimeFormat: function(t) {
                var e = ~~(t / 3600),
                    i = ~~(t % 3600 / 60),
                    n = ~~t % 60,
                    o = "";
                return e > 0 && (o += e + ":" + (i < 10 ? "0" : "")), o += i + ":" + (n < 10 ? "0" : ""), o += "" + n
            },
            progressCountdown: function(t) { var e = this; return new Promise(function(i, n) { var o = setInterval(function() { t--, e.remainTime.string = e.fancyTimeFormat(t), t <= 0 && (e.expireCodeData(), clearInterval(o), i(!0)) }, 1e3) }) }
        }), cc._RF.pop()
    }, { "../../../../Util/Http": "Http", BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    Config: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "05c18T81bpMJoySqeB29I5A", "Config"), e.exports = { HOST: "https://go68.live:8080", SOCKET: "ws://go68.live:8080" }, cc._RF.pop()
    }, {}],
    DEvent: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "84193OGZrdD/YtGX/ttIqDX", "DEvent");
        var n = t("EventTaiXiu"),
            o = t("EventAngrybird"),
            c = t("EventBigBabol"),
            s = t("EventMiniPoker");
        cc.Class({ extends: cc.Component, properties: { menu: cc.Node, content: cc.Node, eventAngrybird: o, eventBigBabol: c, eventMiniPoker: s, eventTaiXiu: n }, selectEvent: function(t) { this.menu.children.forEach(function(e) { e.name === t.target.name ? (e.children[0].active = !1, e.children[1].active = !0) : (e.children[0].active = !0, e.children[1].active = !1) }), this.content.children.forEach(function(e) { e.name === t.target.name ? e.active = !0 : e.active = !1 }) }, onData: function(t) { t.taixiu && this.eventTaiXiu.onData(t.taixiu) }, onHU: function(t) { this.eventMiniPoker.onData(t.mini_poker), this.eventAngrybird.onData(t.arb), this.eventBigBabol.onData(t.big_babol) } }), cc._RF.pop()
    }, { EventAngrybird: "EventAngrybird", EventBigBabol: "EventBigBabol", EventMiniPoker: "EventMiniPoker", EventTaiXiu: "EventTaiXiu" }],
    DaiLy: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b34d9AiZuRD2apbYes7Z3Zz", "DaiLy"), cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node, prefabDaiLy: cc.Prefab },
            init: function(t) { this.RedT = t, this.daily_list = [] },
            onLoad: function() { console.log("onLoad") },
            onEnable: function() { this.RedT.DaiLy.loadDaiLy(), console.log("onLoad") },
            loadDaiLy: function() { this.isLoaded || cc.RedT.send({ shop: { get_daily: !0 } }) },
            onData: function(t) { this.onDaiLy(t) },
            onDaiLy: function(t) {
                var e = this;
                e.content.destroyAllChildren();
                var i = new RegExp("^" + cc.RedT.user.name + "$", "i");
                this.daily_list = t.map(function(t, n) {!e.RedT.ChuyenRed.meDaily && (e.RedT.ChuyenRed.meDaily = i.test(t.nickname)); var o = cc.instantiate(e.prefabDaiLy); return (o = o.getComponent("ChuyenRed_daily")).init(e.RedT.ChuyenRed, t, n), o.bg.active = n % 2, e.content.addChild(o.node), o })
            }
        }), cc._RF.pop()
    }, {}],
    DangKyOTP: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6aa41Wg701MCq0Vmi5zwJ+1", "DangKyOTP");
        t("BrowserUtil"), t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { phone: cc.EditBox, nodeReg: cc.Node, nodeInfo: cc.Node, btnOTPApp: cc.Node, labelPhone: cc.Label, labelStatus: cc.Label, captcha: cc.EditBox, capchaSprite: cc.Sprite, url: "https://t.me/kitudu_bot" },
            onEnable: function() { this.reCaptcha() },
            onDisable: function() { this.clear() },
            onRegClick: function() { this.phone.string.length < 10 ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I!", text: "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng h\u1ee3p l\u1ec7." }) : 4 != this.captcha.string.length ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I!", text: "Captcha kh\xf4ng h\u1ee3p l\u1ec7." }) : cc.RedT.send({ user: { security: { regPhone: { phone: this.phone.string, captcha: this.captcha.string } } } }) },
            clear: function() { this.phone.string = "", this.captcha.string = "" },
            statusOTP: function(t) { this.nodeReg.active = !t, this.nodeInfo.active = t, cc.RedT.user.veryphone ? (this.labelStatus.string = "\u0110\xe3 X\xe1c Th\u1ef1c", this.labelStatus.node.color = this.labelStatus.node.color.fromHEX("06B30D"), this.btnOTPApp.active = !1) : (this.labelStatus.string = "Ch\u01b0a X\xe1c Th\u1ef1c", this.labelStatus.node.color = this.labelStatus.node.color.fromHEX("FF0000")) },
            initCaptcha: function(t) {
                var e = this,
                    i = new Image;
                i.src = t, i.width = 150, i.height = 50, setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(i), t.handleLoadedTexture();
                    var n = new cc.SpriteFrame(t);
                    e.capchaSprite.spriteFrame = n
                }, 10)
            },
            reCaptcha: function() { cc.RedT.send({ captcha: "regOTP" }) },
            openOTPApp: function() { cc.sys.openURL("https://t.me/kitudu_bot") }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    Dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "25e93DvojpK6Idfq683yfCg", "Dialog");
        var n = t("SignIn"),
            o = t("SignUp"),
            c = t("ForGotPass"),
            s = t("SignName"),
            a = t("Shop"),
            h = t("Profile"),
            r = t("Settings"),
            d = t("TheCao"),
            u = t("GiftCode"),
            l = t("DEvent"),
            p = t("PokerNap"),
            g = t("iMessage"),
            m = t("x2Nap");
        cc.Class({ extends: cc.Component, properties: { signIn: n, signUp: o, ForGotPass: c, signName: s, shop: a, profile: h, the_cao: d, settings: r, GiftCode: u, DEvent: l, PokerNap: p, iMessage: g, Eventx2Nap: cc.Node, x2Nap: m, VipPoint: cc.Node }, init: function() { this.VipPoint = this.VipPoint.getComponent("VipPoint"), this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null, this.shop.init(), this.profile.init(), this.the_cao.init() }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showSignIn: function() { this.node.active = this.signIn.node.active = !0, this.objShow = this.signIn.node }, showSignInToUp: function() { this.objShow.active = !1, this.signUp.node.previous = this.objShow, this.showSignUp() }, showSignUp: function() { this.node.active = this.signUp.node.active = !0, this.objShow = this.signUp.node }, showForGotPass: function() { this.objShow && (this.objShow.active = !1, this.ForGotPass.node.previous = this.objShow), this.node.active = this.ForGotPass.node.active = !0, this.objShow = this.ForGotPass.node }, showSignName: function() { this.node.active = this.signName.node.active = !0, this.signUp.node.active = this.signIn.node.active = !1, this.objShow = this.signName.node }, showShop: function(t, e) { cc.RedT.IS_LOGIN ? (this.node.active = this.shop.node.active = !0, this.objShow = this.shop.node, this.shop.superView(e)) : this.showSignIn() }, showProfile: function(t, e) { this.node.active = this.profile.node.active = !0, this.objShow = this.profile.node, this.profile.superView(e) }, showSetting: function(t) { this.node.active = this.settings.node.active = !0, this.objShow = this.settings.node }, showGiftCode: function(t) { cc.RedT.IS_LOGIN ? (this.node.active = this.GiftCode.node.active = !0, this.objShow = this.GiftCode.node) : this.showSignIn() }, showDEvent: function(t) { cc.RedT.IS_LOGIN ? (this.node.active = this.DEvent.node.active = !0, this.objShow = this.DEvent.node) : this.showSignIn() }, showPokerNap: function(t) { this.node.active = this.PokerNap.node.active = !0, this.objShow = this.PokerNap.node, this.PokerNap.init(t) }, showiMessage: function(t) { this.node.active = this.iMessage.node.active = !0, this.objShow = this.iMessage.node }, showLichSuGiaoDich: function(t, e) {}, showEventx2Nap: function(t, e) { cc.RedT.IS_LOGIN ? (this.node.active = this.Eventx2Nap.active = !0, this.objShow = this.Eventx2Nap) : this.showSignIn() }, showx2Nap: function(t) { this.node.active = this.x2Nap.node.active = !0, this.objShow = this.x2Nap.node, this.x2Nap.init(t) }, showVipPoint: function(t) { this.objShow && (this.objShow.active = !1, this.VipPoint.node.previous = this.objShow), this.node.active = this.VipPoint.node.active = !0, this.objShow = this.VipPoint.node } }), cc._RF.pop()
    }, { DEvent: "DEvent", ForGotPass: "ForGotPass", GiftCode: "GiftCode", PokerNap: "PokerNap", Profile: "Profile", Settings: "Settings", Shop: "Shop", SignIn: "SignIn", SignName: "SignName", SignUp: "SignUp", TheCao: "TheCao", iMessage: "iMessage", x2Nap: "x2Nap" }],
    DisableClick: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a0680bUBBRNNZFsRV8g5DR/", "DisableClick"), cc.Class({ extends: cc.Component, onEnable: function() { this.node.on("touchstart", function(t) { t.stopPropagation() }), this.node.on("touchend", function(t) { t.stopPropagation() }) }, onDisable: function() { this.node.off("touchstart", function(t) { t.stopPropagation() }), this.node.off("touchend", function(t) { t.stopPropagation() }) } }), cc._RF.pop()
    }, {}],
    DoiMatKhau: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "99ffdd9WihFhpmOaK8H6Qen", "DoiMatKhau");
        var n = t("BrowserUtil");
        t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { OldPassword: { default: null, type: cc.EditBox }, NewPassword: { default: null, type: cc.EditBox }, ReNewPassword: { default: null, type: cc.EditBox } },
            onLoad: function() {
                var t = this;
                this.editboxs = [this.OldPassword, this.NewPassword, this.ReNewPassword], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onChangerClick(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clear() },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() { for (var t in cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1) },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onChangerClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            onChangerClick: function() { this.OldPassword.string.length < 6 || this.OldPassword.string.length > 32 || this.NewPassword.string.length < 6 || this.NewPassword.string.length > 32 || this.ReNewPassword.string.length < 6 || this.ReNewPassword.string.length > 32 ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "M\u1eadt kh\u1ea9u t\u1eeb 6 \u0111\u1ebfn 32 k\xfd t\u1ef1.\n\nH\xe3y ki\u1ec3m tra l\u1ea1i c\xe1c th\xf4ng tin." }) : this.OldPassword.string == this.NewPassword.string ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "M\u1eadt kh\u1ea9u m\u1edbi kh\xf4ng tr\xf9ng v\u1edbi m\u1eadt kh\u1ea9u c\u0169." }) : this.NewPassword.string != this.ReNewPassword.string ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u m\u1edbi kh\xf4ng kh\u1edbp." }) : (cc.RedT.inGame.loading.active = !0, cc.RedT.send({ user: { doi_pass: { passOld: this.OldPassword.string, passNew: this.NewPassword.string, passNew2: this.ReNewPassword.string } } })) },
            clear: function() { this.OldPassword.string = this.NewPassword.string = this.ReNewPassword.string = "" }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    EF_NoHu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "69875aVuIhMXIrGxl2Od9Bs", "EF_NoHu"), cc.Class({ extends: cc.Component, properties: { close: cc.Node }, onCloseClick: function() { this.node.active = !1 } }), cc._RF.pop()
    }, {}],
    EVipPoint_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c22d4uJvO1AjL7obWP+rLdF", "EVipPoint_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, icon1: cc.Node, icon2: cc.Node, icon3: cc.Node, icon_oto: cc.Node, icon_z800: cc.Node, icon_sh: cc.Node, icon_iphone: cc.Node, icon_coin: cc.Node, top: cc.Label, nick: cc.Label, vip: cc.Label, giai5: cc.Node, giai6: cc.Node, giai7: cc.Node, giai8: cc.Node, giai9: cc.Node, giai10_21: cc.Node, giai21_50: cc.Node } }), cc._RF.pop()
    }, {}],
    EventAngrybird: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3da1fygKJVLg6AhCJ4o8/B/", "EventAngrybird"), cc.Class({
            extends: cc.Component,
            properties: { text100: cc.Label, text1000: cc.Label, text10000: cc.Label },
            onData: function(t) {
                var e = t.filter(function(t) { return 100 == t.type && 1 == t.red });
                this.text100.string = "* X" + e[0].x + " h\u0169 ph\xf2ng 100, (sau " + e[0].toX + " h\u0169, " + e[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + e[0].x + ")";
                var i = t.filter(function(t) { return 1e3 == t.type && 1 == t.red });
                this.text1000.string = "* X" + i[0].x + " h\u0169 ph\xf2ng 1.000, (sau " + i[0].toX + " h\u0169, " + i[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + i[0].x + ")";
                var n = t.filter(function(t) { return 1e4 == t.type && 1 == t.red });
                this.text10000.string = "* X" + n[0].x + " h\u0169 ph\xf2ng 10.000, (sau " + n[0].toX + " h\u0169, " + n[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + n[0].x + ")"
            }
        }), cc._RF.pop()
    }, {}],
    EventBigBabol: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9cc99A4PaNHspACLK1eSt4Y", "EventBigBabol"), cc.Class({
            extends: cc.Component,
            properties: { text100: cc.Label, text1000: cc.Label, text10000: cc.Label },
            onData: function(t) {
                var e = t.filter(function(t) { return 100 == t.type && 1 == t.red });
                this.text100.string = "* X" + e[0].x + " h\u0169 ph\xf2ng 100, (sau " + e[0].toX + " h\u0169, " + e[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + e[0].x + ")";
                var i = t.filter(function(t) { return 1e3 == t.type && 1 == t.red });
                this.text1000.string = "* X" + i[0].x + " h\u0169 ph\xf2ng 1.000, (sau " + i[0].toX + " h\u0169, " + i[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + i[0].x + ")";
                var n = t.filter(function(t) { return 1e4 == t.type && 1 == t.red });
                this.text10000.string = "* X" + n[0].x + " h\u0169 ph\xf2ng 10.000, (sau " + n[0].toX + " h\u0169, " + n[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + n[0].x + ")"
            }
        }), cc._RF.pop()
    }, {}],
    EventMiniPoker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7cc57Khr6xN25cbkkD7jvU8", "EventMiniPoker"), cc.Class({
            extends: cc.Component,
            properties: { text100: cc.Label, text1000: cc.Label, text10000: cc.Label },
            onData: function(t) {
                var e = t.filter(function(t) { return 100 == t.type && 1 == t.red });
                this.text100.string = "* X" + e[0].x + " h\u0169 ph\xf2ng 100, (sau " + e[0].toX + " h\u0169, " + e[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + e[0].x + ")";
                var i = t.filter(function(t) { return 1e3 == t.type && 1 == t.red });
                this.text1000.string = "* X" + i[0].x + " h\u0169 ph\xf2ng 1.000, (sau " + i[0].toX + " h\u0169, " + i[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + i[0].x + ")";
                var n = t.filter(function(t) { return 1e4 == t.type && 1 == t.red });
                this.text10000.string = "* X" + n[0].x + " h\u0169 ph\xf2ng 10.000, (sau " + n[0].toX + " h\u0169, " + n[0].balans + " h\u0169 \u0111\u01b0\u1ee3c X" + n[0].x + ")"
            }
        }), cc._RF.pop()
    }, {}],
    EventTaiXiu_itemDay: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "688ad1Awp1CHq7rXjPwOiyM", "EventTaiXiu_itemDay"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, day: cc.Label }, onClickSelect: function() { this.RedT.dateView(this.day) } }), cc._RF.pop()
    }, {}],
    EventTaiXiu_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "776e2WuPddPI5Z1l8EHRach", "EventTaiXiu_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, top: cc.Label, users: cc.Label, day: cc.Label, date: cc.Label, gift: cc.Label } }), cc._RF.pop()
    }, {}],
    EventTaiXiu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e29efzOFZlKPa4AV0cVt6FW", "EventTaiXiu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { menu: cc.Node, content: cc.Node, HQmenu: cc.Node, HQcontent: cc.Node, HQcontentDay: cc.Node, item: cc.Prefab, itemDay: cc.Prefab, contentHQLeft: cc.Node, contentHQRight: cc.Node, LabelDate: cc.Label, nodeDateMore: cc.Node, dataOld: !1 },
            onLoad: function() { this.dateTop = new Date, this.dateTop.setDate(this.dateTop.getDate() - 1) },
            selectEvent: function(t) { this.nodeDateMore.active = !1, "top" == t.target.name ? this.onGetTop() : "homqua" == t.target.name && this.onGetHomQua(), this.menu.children.forEach(function(e) { e.name === t.target.name ? (e.children[0].active = !1, e.children[1].active = !0, e.children[2].color = cc.color().fromHEX("FAF578"), e.pauseSystemEvents()) : (e.children[0].active = !0, e.children[1].active = !1, e.children[2].color = cc.Color.BLACK, e.resumeSystemEvents()) }), this.content.children.forEach(function(e) { e.name === t.target.name ? e.active = !0 : e.active = !1 }) },
            selectHeadHQ: function(t) { this.HQmenu.children.forEach(function(e) { e.name === t.target.name ? (e.children[0].active = !1, e.children[1].active = !0) : (e.children[0].active = !0, e.children[1].active = !1) }), this.HQcontent.children.forEach(function(e) { e.name === t.target.name ? e.active = !0 : e.active = !1 }) },
            onGetTop: function() { cc.RedT.send({ event: { taixiu: { getTop: !0 } } }) },
            onGetHomQua: function() {!this.dataOld && cc.RedT.send({ event: { taixiu: { getTopHQ: this.LabelDate.string } } }) },
            dateToggle: function() { this.nodeDateMore.active = !this.nodeDateMore.active },
            dateView: function(t) { t.string != this.LabelDate.string && (this.dataOld = !1, this.LabelDate.string = t.string, this.onGetHomQua()), this.nodeDateMore.active = !1 },
            onData: function(t) { t.topHQ && (this.dataOld = !0, this.topHQ(t.topHQ)) },
            topHQ: function(t) {
                this.contentHQLeft.destroyAllChildren(), this.contentHQRight.destroyAllChildren(), t.win.reverse(), t.lost.reverse(), t.win.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("EventTaiXiu_item")).bg.active = e % 2, i.top.string = t.top, i.users.string = t.name, i.day.string = t.line, i.date.string = this.LabelDate.string, i.gift.string = n.numberWithCommas(t.reward), i.node.children[0].active = !(1 & e), this.contentHQLeft.addChild(i.node)
                }.bind(this)), t.lost.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("EventTaiXiu_item")).bg.active = e % 2, i.top.string = t.top, i.users.string = t.name, i.day.string = t.line, i.date.string = this.LabelDate.string, i.gift.string = n.numberWithCommas(t.reward), i.node.children[0].active = !(1 & e), this.contentHQRight.addChild(i.node)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    "Fish_bullet EF": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3a330//WeBF2b3HjqWpZzen", "Fish_bullet EF"), cc.Class({ extends: cc.Component, properties: { anim: dragonBones.ArmatureDisplay, typeBet: 0 }, onLoad: function() { this.onDie = function() { this.node.destroy() }, this.anim.on(dragonBones.EventObject.COMPLETE, this.onDie, this), this.anim.playAnimation("kyby_zidan" + this.typeBet + "-hit", 1) } }), cc._RF.pop()
    }, {}],
    Fish_bullet: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b002ckgsd9Ndr4/xSE5GpV3", "Fish_bullet"), cc.Class({
            extends: cc.Component,
            properties: { body: cc.RigidBody, collider: cc.PhysicsCircleCollider, icon: cc.Node, isMe: !1, isLock: !1, bullet: 0 },
            init: function(t, e) {
                this.RedT = t;
                var i = e.x,
                    n = e.y;
                this.node.x = this.RedT.node.x, this.node.y = this.RedT.node.y;
                var o = this.node.x,
                    c = this.node.y,
                    s = cc.v2(i - o, n - c);
                s.normalizeSelf(), s.mulSelf(this.RedT.RedT.Game.bulletVelocity), this.body.linearVelocity = s;
                var a = this.RedT.node.parent.convertToWorldSpaceAR(e),
                    h = this.RedT.node.convertToNodeSpaceAR(a);
                h = cc.misc.radiansToDegrees(Math.atan2(h.x, h.y)), this.icon.angle = -h, this.updateGroup()
            },
            onPostSolve: function() {
                var t = this.body.linearVelocity;
                t = cc.misc.radiansToDegrees(Math.atan2(t.x, t.y)), this.icon.angle = -t
            },
            onCollisionEnter: function(t) {
                if ("tuong" !== t.node.group) {
                    void 0 !== this.id && delete this.RedT.bullet[this.id];
                    var e = cc.instantiate(this.RedT.RedT.Game.ef_bullet[this.bullet]);
                    e.x = this.node.x, e.y = this.node.y, this.RedT.RedT.Game.nodeDan.addChild(e), this.node.destroy(), this.isMe && cc.RedT.send({ g: { fish: { collision: { id: this.id, f: t.node.id } } } })
                }
            },
            updateGroup: function() {
                var t = "dan";
                this.node && (this.isLock && (t += this.RedT.map), this.node.group = t)
            }
        }), cc._RF.pop()
    }, {}],
    Fish_fish_group: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "93eafuGlupJxI0wpNs4ofEh", "Fish_fish_group");
        var n = t("Fish_fish");
        cc.Class({
            extends: cc.Component,
            properties: { anim: cc.Animation, fish: { default: [], type: n } },
            init: function(t, e) {
                if (this.g = e.g, this.node.g = e.g, void 0 !== e.z && (this.node.zIndex = e.z), this.anim.on("finished", this.onFinish, this), void 0 !== e.r) {
                    var i = this.anim.getClips()[e.r].name;
                    this.anim.play(i), this.animState = this.anim.getAnimationState(i)
                }
                void 0 !== e.a && (this.anim.play(e.a), this.animState = this.anim.getAnimationState(e.a)), void 0 !== e.t && (this.animState.time = e.t), this.fish = this.node.children.map(function(i, o) { i = i.getComponent(n); var c = e.f[o]; return c && void 0 !== c.id ? (t.fish[c.id] = i, i.init(t, c), i.inGroup = !0) : i.node.active = !1, i })
            },
            onFinish: function() { this.fish.forEach(function(t) { t.onFinish() }), delete this.fish, this.node.destroy() }
        }), cc._RF.pop()
    }, { Fish_fish: "Fish_fish" }],
    Fish_fish: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "655c6/MZdJNZo/YxgAvEk8A", "Fish_fish"), cc.Class({
            extends: cc.Component,
            properties: { fish: dragonBones.ArmatureDisplay, shadow: dragonBones.ArmatureDisplay, collider: cc.PolygonCollider, anim: cc.Animation, head: cc.Node, end: cc.Node, suoMe: cc.Node, suoOther: cc.Node, speed: 1, define: !1 },
            init: function(t, e) {
                if (this.define = !0, this.RedT = t, this.id = e.id, this.node.id = e.id, this.node.fish = e.f, this.node.zIndex = e.f, this.player1 = !1, this.player2 = !1, this.player3 = !1, this.player4 = !1, this.bullet1 = {}, this.bullet2 = {}, this.bullet3 = {}, this.bullet4 = {}, this.anim) {
                    if (this.anim.on("finished", this.onFinish, this), void 0 !== e.r) {
                        var i = this.anim.getClips()[e.r].name;
                        this.anim.play(i), this.animState = this.anim.getAnimationState(i)
                    }
                    void 0 !== e.a && (this.anim.play(e.a), this.animState = this.anim.getAnimationState(e.a)), this.animState.speed = this.speed, void 0 !== e.t && (this.animState.time = e.t)
                }
            },
            onFinish: function() { this.node && (this.clear(), this.node.destroy()) },
            onDelete: function() { this.node.destroy() },
            updateGroup: function() {
                var t = "fish";
                this.player1 && (t += "1"), this.player2 && (t += "2"), this.player3 && (t += "3"), this.player4 && (t += "4"), this.node && (this.node.group = t), this.updateSuoOther()
            },
            unLock: function(t) {
                var e = this["player" + t];
                e && (e.isLock = !1, e.fish = null), Object.entries(this["bullet" + t]).forEach(function(e) { e[1].isLock = !1, e[1].updateGroup(), delete this["bullet" + t][e[0]] }.bind(this)), this["player" + t] = !1, this.updateGroup()
            },
            updateSuoOther: function() {
                var t = !1;
                this.player1 && this.player1 !== this.RedT.player && (t = !0), this.player2 && this.player2 !== this.RedT.player && (t = !0), this.player3 && this.player3 !== this.RedT.player && (t = !0), this.player4 && this.player4 !== this.RedT.player && (t = !0), this.suoOther.active = t
            },
            getPosition: function() { var t = this.node.parent.convertToWorldSpaceAR(this.node.position); return this.RedT.node.convertToNodeSpaceAR(t) },
            getPoint: function() {
                var t = this.RedT.node.width / 2 - 15,
                    e = this.RedT.node.height / 2 - 15,
                    i = this.head.parent.convertToWorldSpaceAR(this.head.position),
                    n = this.RedT.node.convertToNodeSpaceAR(i),
                    o = Math.abs(n.x),
                    c = Math.abs(n.y);
                if ((t < o || e < c) && this.end) {
                    var s = this.end.parent.convertToWorldSpaceAR(this.end.position),
                        a = this.RedT.node.convertToNodeSpaceAR(s),
                        h = Math.abs(a.x),
                        r = Math.abs(a.y),
                        d = this.node.scaleX * this.node.parent.scaleX;
                    if (t < o) {
                        if (h > o - (o - t)) return { position: a, stop: !0 };
                        n.x = 1 === d ? n.x + (o - t) : n.x - (o - t)
                    }
                    if (e < c) {
                        if (r > c - (c - e)) return { position: a, stop: !0 };
                        n.y = 1 === d ? n.y + (c - e) : n.y - (c - e)
                    }
                }
                return { position: n }
            },
            PhaHuy: function(t) { void 0 === t && (t = !0), this.collider.enabled = !1, this.anim && !0 === t && this.anim.stop(), this.clear(), this.suoMe.active = !1, this.suoOther.active = !1, !0 === t && (this.fish.timeScale = this.fish.timeScale / .4), !0 === t && (this.shadow.timeScale = this.fish.timeScale / .4) },
            clear: function() { this.define && (void 0 !== this.RedT && delete this.RedT.fish[this.node.id], this.player1 && (this.player1.isLock = !1, this.player1.fish = null, delete this.player1), Object.entries(this.bullet1).forEach(function(t) { t[1].isLock = !1, t[1].updateGroup(), delete this.bullet1[t[0]] }.bind(this)), this.player2 && (this.player2.isLock = !1, this.player2.fish = null, delete this.player2), Object.entries(this.bullet2).forEach(function(t) { t[1].isLock = !1, t[1].updateGroup(), delete this.bullet2[t[0]] }.bind(this)), this.player3 && (this.player3.isLock = !1, this.player3.fish = null, delete this.player3), Object.entries(this.bullet3).forEach(function(t) { t[1].isLock = !1, t[1].updateGroup(), delete this.bullet3[t[0]] }.bind(this)), this.player4 && (this.player4.isLock = !1, this.player4.fish = null, delete this.player4), Object.entries(this.bullet4).forEach(function(t) { t[1].isLock = !1, t[1].updateGroup(), delete this.bullet4[t[0]] }.bind(this))) },
            onDestroy: function() { this.onFinish(), delete this.RedT }
        }), cc._RF.pop()
    }, {}],
    Fish_game: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b8ab7zFBrVDh6q2aSZhB9s0", "Fish_game");
        t("Helper");
        var n = t("BrowserUtil"),
            o = t("Fish_shubiao");
        cc.Class({
            extends: cc.Component,
            properties: { nodeFish: cc.Node, nodeDan: cc.Node, nodeTouch: cc.Node, nodeMenu: cc.Node, boxAnim: cc.Animation, nodeCoint: cc.Node, nodeLabel: cc.Node, nodeEF: cc.Node, nodeEVENT: cc.Node, nodeAudio: cc.Node, spriteAuto: cc.Sprite, spriteLock: cc.Sprite, nodeAuto: cc.Node, nodeLock: cc.Node, shubiao: o, isAuto: !1, isFire: !1, isLock: !1, setPoint: !1, autoNap: !1, bulletVelocity: 2e3, bulletSpeed: 100, red: 0, bulletID: 0, cointMe: cc.Prefab, cointOther: cc.Prefab, labelMe: cc.Prefab, labelOther: cc.Prefab, bullet: { default: [], type: cc.Prefab }, ef_bullet: { default: [], type: cc.Prefab }, ef_bom: cc.Prefab, ef_gold_bom: cc.Prefab, ef_hailang: cc.Prefab, fishPrefab: { default: [], type: cc.Prefab }, x2_2g6: cc.Prefab, xr1: cc.Prefab, xr2: cc.Prefab, xr3: cc.Prefab, xr4: cc.Prefab, xr5: cc.Prefab, xr6: cc.Prefab },
            init: function(t) { this.RedT = t, this.sungFixD = { 1: { x: -1, y: 1 }, 2: { x: 1, y: -1 } }, this.sungFix = 1, this.shubiao.init(this), this.fish = {}, this.ponit = null, this.efcoint = { 1: { x: 55, y: 55, max: 4, min: 2, ef: 1 }, 2: { x: 55, y: 55, max: 4, min: 2, ef: 1 }, 3: { x: 80, y: 80, max: 4, min: 2, ef: 1 }, 4: { x: 80, y: 80, max: 5, min: 3, ef: 1 }, 5: { x: 80, y: 80, max: 5, min: 3, ef: 1 }, 6: { x: 80, y: 80, max: 5, min: 3, ef: 1 }, 7: { x: 80, y: 80, max: 6, min: 3, ef: 1 }, 8: { x: 80, y: 80, max: 6, min: 3, ef: 1 }, 9: { x: 80, y: 80, max: 6, min: 3, ef: 1 }, 10: { x: 100, y: 80, max: 6, min: 3, ef: 1 }, 11: { x: 100, y: 80, max: 6, min: 3, ef: 2 }, 12: { x: 100, y: 80, max: 7, min: 3, ef: 2 }, 13: { x: 100, y: 80, max: 7, min: 3, ef: 2 }, 14: { x: 100, y: 80, max: 7, min: 4, ef: 2 }, 15: { x: 100, y: 80, max: 8, min: 4, ef: 2 }, 16: { x: 100, y: 80, max: 8, min: 4, ef: 2 }, 17: { x: 100, y: 80, max: 8, min: 4, ef: 2 }, 18: { x: 100, y: 80, max: 8, min: 4, ef: 2 }, 19: { x: 100, y: 80, max: 8, min: 4, ef: 2 }, 20: { x: 100, y: 80, max: 9, min: 5, ef: 3 }, 21: { x: 100, y: 80, max: 9, min: 5, ef: 3 }, 22: { x: 150, y: 80, max: 9, min: 5, ef: 3 }, 23: { x: 150, y: 130, max: 9, min: 6, ef: 3 }, 24: { x: 150, y: 130, max: 10, min: 6, ef: 3 }, 25: { x: 150, y: 130, max: 10, min: 6, ef: 3 }, 26: { x: 150, y: 130, max: 12, min: 6, ef: 3 }, 27: { x: 200, y: 130, max: 12, min: 7, ef: 3 }, 28: { x: 250, y: 150, max: 15, min: 8, ef: 3 } } },
            onEnable: function() { this.node.y = 0, this.node.x = 0, this.nodeTouch.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.nodeTouch.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.nodeTouch.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.nodeTouch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), n.showCursorFish(), cc.RedT.audio.bg.stop(), cc.RedT.audio.bg = cc.RedT.audio.fishBG1, cc.RedT.audio.bg.volume = this.RedT.volumeNhacNen, 0 !== this.RedT.volumeNhacNen && cc.RedT.audio.bg.play() },
            onDisable: function() { cc.RedT.audio.bg.stop(), cc.RedT.audio.bg = cc.RedT.audio.fishHall, cc.RedT.audio.bg.volume = this.RedT.volumeNhacNen, 0 !== this.RedT.volumeNhacNen && cc.RedT.audio.bg.play(), n.showCursorAutoForce(), this.nodeTouch.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.nodeTouch.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.nodeTouch.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.nodeTouch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.nodeMenu.active = !1, this.RedT.players.forEach(function(t) { t.iconCoint.spriteFrame = this.RedT.cointOther, t.nodeChangerbet.active = !1, t.isMe = !1, t.isFire = !1, t.isLock = !1, t.nodeSung.angle = 0, t.nodeCanh.angle = 0, t.bullet = {}, t.fish = null }.bind(this)), this.fish = {}, this.nodeFish.destroyAllChildren(), this.nodeDan.destroyAllChildren(), this.nodeCoint.destroyAllChildren(), this.nodeLabel.destroyAllChildren(), this.nodeEF.destroyAllChildren(), this.nodeEVENT.destroyAllChildren(), this.nodeAudio.destroyAllChildren(), this.setPoint = !1, this.bulletID = 0, this.isAuto = !1, this.isFire = !1, this.isLock = !1, this.autoNap = !1, this.reset() },
            eventStart: function(t) { this.player.isLock || (this.isFire = !0), this.setPoint = !0, this.ponit = this.shubiao.node.position = this.node.convertToNodeSpaceAR(t.touch.getLocation()), this.shubiao.fire(this.shubiao.node.position) },
            eventMove: function(t) { this.player.isLock || (this.ponit = this.shubiao.node.position = this.node.convertToNodeSpaceAR(t.touch.getLocation()), this.angleSung(this.shubiao.node.position)) },
            eventEnd: function() { this.isFire = !1 },
            angleSung: function(t, e) {
                void 0 === e && (e = !1), e && (this.shubiao.dragonBones.playAnimation("newAnimation", 1), this.player.onFire(this.shubiao.node.position));
                var i = this.shubiao.node.parent.convertToWorldSpaceAR(this.shubiao.node.position),
                    n = this.player.node.convertToNodeSpaceAR(i);
                n = cc.misc.radiansToDegrees(Math.atan2(n.x * this.sungFixD[this.sungFix].x, n.y * this.sungFixD[this.sungFix].y)), this.player.nodeSung.angle = n, this.player.nodeCanh.angle = this.player.nodeSung.angle
            },
            menuToggle: function() { this.nodeMenu.active = !this.nodeMenu.active },
            onClickOutGame: function() { cc.RedT.send({ g: { fish: { outgame: !0 } } }), this.RedT.nodeHome.active = !0, this.RedT.nodeGame.active = !1 },
            betPlus: function() { this.player.typeBet++, this.player.typeBet > 5 && (this.player.typeBet = 0), this.player.onChangerTypeBet(this.player.typeBet), this.sendChangerTypeBet(this.player.typeBet), 0 !== this.RedT.volumeHieuUng && this.addAudioPhao() },
            betMinus: function() { this.player.typeBet--, this.player.typeBet < 0 && (this.player.typeBet = 5), this.player.onChangerTypeBet(this.player.typeBet), this.sendChangerTypeBet(this.player.typeBet), 0 !== this.RedT.volumeHieuUng && this.addAudioPhao() },
            addAudioPhao: function() {
                var t = cc.instantiate(this.RedT.audioPhao.node);
                (t = t.getComponent(cc.AudioSource)).volume = this.RedT.volumeHieuUng, this.nodeAuto.addChild(t.node), t.play()
            },
            sendChangerTypeBet: function(t) { cc.RedT.send({ g: { fish: { typeBet: t } } }) },
            onClickAuto: function() { this.isLock && this.player.fish && (this.player.fish.suoMe.active = !1, this.player.fish.unLock(this.player.map)), this.ponit && (this.shubiao.node.position = this.ponit), this.isAuto = !this.isAuto, this.player.isLock = this.isLock = !1, this.spriteAuto.enable = !this.isAuto, this.nodeAuto.active = this.isAuto, this.spriteLock.enable = !0, this.nodeLock.active = !1, this.setPoint && this.player.onFire() },
            onClickLock: function() { this.player.fish && (this.player.fish.suoMe.active = !1, this.player.fish.unLock(this.player.map)), this.isLock = !this.isLock, this.isAuto = this.player.isLock = !1, this.spriteLock.enable = !this.isLock, this.nodeLock.active = this.isLock, this.spriteAuto.enable = !0, this.nodeAuto.active = !1 },
            reset: function() { this.spriteAuto.enable = !0, this.nodeAuto.active = !1, this.spriteLock.enable = !0, this.nodeLock.active = !1 }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Fish_shubiao: "Fish_shubiao", Helper: "Helper" }],
    Fish_history_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "995fdt4d2FCr7s7Nh2/XiI4", "Fish_history_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, labelTime: cc.Label, labelRoom: cc.Label, labelFish: cc.Label, labelWin: cc.Label } }), cc._RF.pop()
    }, {}],
    Fish_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "45008W89GZCx7mnxEIhI//f", "Fish_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node },
            onLoad: function() {
                var t = cc.instantiate(this.page);
                t.y = -289, this.node.addChild(t), this.page = t.getComponent("Pagination"), this.content = this.content.children.map(function(t) { return t.getComponent("Fish_history_item") }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { fish: { log: t } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 2, e.labelTime.string = n.getStringDateByTime(o.time), e.labelRoom.string = this.room(o.room), e.labelFish.string = n.numberWithCommas(o.fish), e.labelWin.string = (o.money < 0 ? "-" : o.money > 0 ? "+" : "") + n.numberWithCommas(n.getOnlyNumberInString("" + o.money)), e.labelWin.node.color = o.money < 0 ? e.labelWin.node.color.fromHEX("#FF0000") : e.labelWin.node.color.fromHEX("#139C19")) : e.node.active = !1
                }.bind(this))
            },
            room: function(t) {
                switch (t) {
                    case 1:
                        return "B\xecnh d\xe2n";
                    case 2:
                        return "\u0110\u1ea1i gia";
                    case 3:
                        return "VIP"
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Fish_nap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7367dwn7GJNKp2JprdSku2f", "Fish_nap");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { touch: cc.Node, mask: cc.Node, toggle: cc.Toggle, labelBet: cc.Label, labelMin: cc.Label, labelMax: cc.Label, min: "", max: "", outGame: !1 },
            init: function() {
                var t = cc.RedT.inGame.room[cc.RedT.inGame.regGame];
                this.betMin = t * this.min, this.betMax = t * this.max, this.h = this.betMin < 2e4 ? 1e3 : this.betMin < 2e5 ? 1e4 : 1e5, this.labelMin.string = this.labelBet.string = n.numberWithCommas(this.betMin), this.labelMax.string = n.numberWithCommas(this.betMax), this.betMin = this.betMin / this.h, this.betMax = this.betMax / this.h, this.toggle.isChecked = !0
            },
            onEnable: function() { this.init(), this.node.runAction(cc.RedT.inGame.dialog.actionShow), this.touch.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this) },
            onDisable: function() { cc.RedT.inGame.dialog.resetSizeDialog(this.node), this.touch.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.outGame = !1, this.mask.width = 0, this.touch.position = cc.v2(0, 0) },
            eventStart: function(t) { this.touch.runAction(cc.scaleTo(.1, .7)), this.offsetX = { localX: t.touch.getLocationX(), x: this.touch.position.x } },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.offsetX.localX + this.offsetX.x;
                e < 0 ? e = 0 : e > 401 && (e = 401), this.mask.width = e, this.touch.position = cc.v2(e, 0);
                var i = e / 401 * (this.betMax - this.betMin) + this.betMin >> 0;
                this.labelBet.string = n.numberWithCommas(i * this.h)
            },
            eventEnd: function() { this.touch.runAction(cc.scaleTo(.1, .6)) },
            onOkClick: function() { cc.RedT.inGame.loading.active = !0, !0 === this.outGame ? cc.RedT.send({ g: { fish: { nap: n.getOnlyNumberInString(this.labelBet.string) } } }) : cc.RedT.send({ g: { fish: { reg: { room: cc.RedT.inGame.regGame, balans: n.getOnlyNumberInString(this.labelBet.string) } } } }) },
            onCancelClick: function() {!0 === this.outGame && cc.RedT.inGame.Game.onClickOutGame(), cc.RedT.inGame.dialog.onClickBack() }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Fish_player: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "362a4sVh3ZMlqR1Ph1C+dSk", "Fish_player");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { nick: cc.Label, balans: cc.Label, bet: cc.Label, iconCoint: cc.Sprite, typeBet: 0, nodeChangerbet: cc.Node, canhs: { default: [], type: dragonBones.ArmatureDisplay }, canh: dragonBones.ArmatureDisplay, sungs: { default: [], type: dragonBones.ArmatureDisplay }, sung: dragonBones.ArmatureDisplay, nodeCanh: cc.Node, nodeSung: cc.Node, isFire: !1, isLock: !1, sungFix: 2, map: 0, money: 0 },
            init: function(t) { this.RedT = t, this.fish = null, this.bullet = {} },
            onInfo: function(t) { this.nick.string = t.name, this.balans.string = n.numberWithCommas(t.balans), this.money = t.balans, this.bet.string = n.numberWithCommas(this.RedT["typeBet" + this.RedT.regGame][t.typeBet]), this.typeBet = t.typeBet, this.onTypeBet(t.typeBet) },
            onTypeBet: function(t) {
                this.canhs.forEach(function(e, i) { e.node.active = t === i }), this.sungs.forEach(function(e, i) { e.node.active = t === i }), this.canh = this.canhs[t], this.sung = this.sungs[t], this.sung.node.insertChild(this.bet.node);
                this.canh.on(dragonBones.EventObject.LOOP_COMPLETE, function t() { this.canh.playAnimation(this.RedT.anim_canh[1], 0), this.canh.off(dragonBones.EventObject.LOOP_COMPLETE, t, this) }, this), this.canh.playAnimation(this.RedT.anim_canh[0], 1);
                this.sung.on(dragonBones.EventObject.LOOP_COMPLETE, function t() { this.sung.off(dragonBones.EventObject.LOOP_COMPLETE, t, this) }, this), this.sung.playAnimation(this.RedT.anim_sung[1], 1)
            },
            onChangerTypeBet: function(t) {
                var e = this,
                    i = function t() { this.canh.playAnimation(this.RedT.anim_canh[1], 0), this.canh.off(dragonBones.EventObject.LOOP_COMPLETE, t, this) };
                this.canh.on(dragonBones.EventObject.LOOP_COMPLETE, function t() { this.off(dragonBones.EventObject.LOOP_COMPLETE, t, this), e.canh.node.active = !0, e.canh.on(dragonBones.EventObject.LOOP_COMPLETE, i, e), e.canh.playAnimation(e.RedT.anim_canh[0], 1) }, this.canh), this.canh.playAnimation(this.RedT.anim_canh[2], 1), this.canh = this.canhs[t];
                var o = function t() { this.sung.off(dragonBones.EventObject.LOOP_COMPLETE, t, this) };
                this.sung.on(dragonBones.EventObject.LOOP_COMPLETE, function t() { this.off(dragonBones.EventObject.LOOP_COMPLETE, t, this), e.sung.node.active = !0, e.sung.on(dragonBones.EventObject.LOOP_COMPLETE, o, e), e.sung.playAnimation(e.RedT.anim_sung[1], 1) }, this.sung), this.sung.playAnimation(this.RedT.anim_sung[2], 1), this.sung = this.sungs[t], this.sung.node.insertChild(this.bet.node), this.bet.string = n.numberWithCommas(this.RedT["typeBet" + this.RedT.regGame][t]), this.typeBet = t
            },
            onFire: function(t) {
                void 0 === t && (t = null);
                var e = this.RedT["typeBet" + this.RedT.regGame][this.typeBet];
                if ((e = this.money - e) < 0) this.RedT.dialog.showNap(!0), this.RedT.Game.isAuto && this.RedT.Game.onClickAuto(), this.RedT.Game.isFire = !1, this.isLock = !1;
                else if ((this.RedT.Game.isAuto || this.RedT.Game.isFire || this.isLock) && !this.isFire) {
                    this.money = e, this.balans.string = n.numberWithCommas(e), this.isFire = !0;
                    var i = cc.instantiate(this.RedT.Game.bullet[this.typeBet]);
                    i = i.getComponent("Fish_bullet");
                    var o = null,
                        c = !1,
                        s = this.RedT.Game.bulletID++;
                    if (this.bullet[s] = i, t && !this.isLock) o = t;
                    else if (this.isLock && this.fish) {
                        c = !0;
                        var a = this.fish.getPoint();
                        o = a.position, this.changerAngle(o), i.isLock = !0, this.fish["bullet" + this.map][s] = i, this.RedT.Game.ponit = o, cc.RedT.send({ g: { fish: { bullet: { id: s, f: this.fish.id } } } }), !0 === a.stop && this.fish.PhaHuy(!1)
                    } else o = this.RedT.Game.shubiao.node.position;
                    !c && cc.RedT.send({ g: { fish: { bullet: { id: s, x: o.x, y: o.y } } } }), i.id = s, i.isMe = !0, i.bullet = this.typeBet, i.init(this, o);
                    var h = cc.instantiate(this.RedT.audioFire.node);
                    (h = h.getComponent(cc.AudioSource)).volume = this.RedT.volumeHieuUng, this.RedT.Game.nodeAudio.addChild(h.node), h.play(), this.RedT.Game.nodeDan.addChild(i.node), this.sung.playAnimation("fire", 1), setTimeout(function() { this.isFire = !1, this.onFire() }.bind(this), this.RedT.Game.bulletSpeed)
                }
            },
            otherBullet: function(t) {
                this.balans.string = n.numberWithCommas(t.money);
                var e = null,
                    i = this.RedT.Game.bulletID++,
                    o = cc.instantiate(this.RedT.Game.bullet[this.typeBet]);
                if (o = o.getComponent("Fish_bullet"), void 0 !== t.f) {
                    var c = this.RedT.Game.fish[t.f];
                    if (void 0 === c) return;
                    var s = c.getPoint();
                    e = s.position, o.isLock = !0, c["bullet" + this.map][i] = o, !0 === s.stop && c.PhaHuy(!1)
                } else e = cc.v2(t.x, t.y);
                o.init(this, e), o.bullet = this.typeBet, this.changerAngle(e), this.RedT.Game.nodeDan.addChild(o.node), this.sung.playAnimation("fire", 1)
            },
            changerAngle: function(t) {
                var e = this.RedT.Game.node.convertToWorldSpaceAR(t),
                    i = this.node.convertToNodeSpaceAR(e);
                (i = cc.misc.radiansToDegrees(Math.atan2(i.x * this.RedT.Game.sungFixD[this.sungFix].x, i.y * this.RedT.Game.sungFixD[this.sungFix].y))) > 90 && (this.isLock = this.isFire = !1), i < -90 && (this.isLock = this.isFire = !1), this.nodeSung.angle = i, this.nodeCanh.angle = this.nodeSung.angle
            },
            reset: function() {}
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Fish_setting: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3af62nlji9BdI0pcvYU8uOn", "Fish_setting"), cc.Class({
            extends: cc.Component,
            properties: { touchNhacNen: cc.Node, maskNhacNen: cc.Node, touchHieuUng: cc.Node, maskHieuUng: cc.Node },
            init: function() { cc.RedT.isSoundBackground() ? (cc.RedT.audio.bg.play(), this.setNhacNen(294)) : this.setNhacNen(0), cc.RedT.isSoundGame() ? this.setHieuUng(294) : this.setHieuUng(0) },
            onEnable: function() { this.node.runAction(cc.RedT.inGame.dialog.actionShow), this.touchNhacNen.on(cc.Node.EventType.TOUCH_START, this.nhacNenStart, this), this.touchNhacNen.on(cc.Node.EventType.TOUCH_MOVE, this.nhacNenMove, this), this.touchNhacNen.on(cc.Node.EventType.TOUCH_END, this.nhacNenEnd, this), this.touchNhacNen.on(cc.Node.EventType.TOUCH_CANCEL, this.nhacNenEnd, this), this.touchHieuUng.on(cc.Node.EventType.TOUCH_START, this.hieuUngStart, this), this.touchHieuUng.on(cc.Node.EventType.TOUCH_MOVE, this.hieuUngMove, this), this.touchHieuUng.on(cc.Node.EventType.TOUCH_END, this.hieuUngEnd, this), this.touchHieuUng.on(cc.Node.EventType.TOUCH_CANCEL, this.hieuUngEnd, this) },
            onDisable: function() { cc.RedT.inGame.dialog.resetSizeDialog(this.node), this.touchHieuUng.off(cc.Node.EventType.TOUCH_START, this.hieuUngStart, this), this.touchHieuUng.off(cc.Node.EventType.TOUCH_MOVE, this.hieuUngMove, this), this.touchHieuUng.off(cc.Node.EventType.TOUCH_END, this.hieuUngEnd, this), this.touchHieuUng.off(cc.Node.EventType.TOUCH_CANCEL, this.hieuUngEnd, this) },
            nhacNenStart: function(t) { this.touchNhacNen.runAction(cc.scaleTo(.1, 1.1)), this.nhacNenX = { localX: t.touch.getLocationX(), x: this.touchNhacNen.x } },
            nhacNenMove: function(t) {
                var e = t.touch.getLocationX() - this.nhacNenX.localX + this.nhacNenX.x;
                e < 0 ? e = 0 : e > 294 && (e = 294), this.setNhacNen(e)
            },
            nhacNenEnd: function() { this.touchNhacNen.runAction(cc.scaleTo(.1, 1)) },
            setNhacNen: function(t) {
                this.maskNhacNen.width = t, this.touchNhacNen.x = t;
                var e = t / 294;
                cc.RedT.audio.fishHall.volume = e, cc.RedT.audio.fishBG1.volume = e, cc.RedT.audio.fishBG2.volume = e, cc.RedT.inGame.volumeNhacNen = e, 0 === e ? (cc.RedT.audio.bg.stop(), cc.RedT.setSoundBackground(!1)) : (cc.RedT.audio.bg.resume(), cc.RedT.setSoundBackground(!0), !1 === cc.RedT.audio.bg.isPlaying && cc.RedT.audio.bg.play())
            },
            hieuUngStart: function(t) { this.touchHieuUng.runAction(cc.scaleTo(.1, 1.1)), this.hieuUngX = { localX: t.touch.getLocationX(), x: this.touchHieuUng.x } },
            hieuUngMove: function(t) {
                var e = t.touch.getLocationX() - this.hieuUngX.localX + this.hieuUngX.x;
                e < 0 ? e = 0 : e > 294 && (e = 294), this.setHieuUng(e)
            },
            hieuUngEnd: function() { this.touchHieuUng.runAction(cc.scaleTo(.1, 1)) },
            setHieuUng: function(t) {
                this.maskHieuUng.width = t, this.touchHieuUng.x = t;
                var e = t / 294;
                cc.RedT.inGame.audioClick.volume = e, cc.RedT.inGame.volumeHieuUng = e, 0 === e ? cc.RedT.setSoundGame(!1) : cc.RedT.setSoundGame(!0)
            }
        }), cc._RF.pop()
    }, {}],
    Fish_shubiao: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "06e28j9YVVPwYFkB3JOakxn", "Fish_shubiao"), cc.Class({
            extends: cc.Component,
            properties: { collider: cc.CircleCollider, dragonBones: dragonBones.ArmatureDisplay, isSelect: !1 },
            init: function(t) { this.RedT = t },
            offLock: function() { this.collider.enabled = !1 },
            onCollisionEnter: function(t) {
                if ("tuong" !== t.node.group) {
                    if (!1 === this.isSelect) {
                        this.isSelect = !0, this.RedT.player.fish && (this.RedT.player.fish.suoMe.active = !1, this.RedT.player.fish.unLock(this.RedT.player.map), cc.RedT.send({ g: { fish: { unlock: !0 } } }));
                        var e = this.RedT.fish[t.node.id];
                        void 0 !== e && (e["player" + this.RedT.player.map] = this.RedT.player, this.RedT.player.fish = e, this.RedT.player.isLock = !0, this.RedT.player.fish.updateGroup(), this.RedT.player.fish.suoMe.active = !0, this.RedT.player.onFire(), cc.RedT.send({ g: { fish: { lock: e.id } } }))
                    }
                } else this.isSelect = !1, this.RedT.player.fish && (this.RedT.player.fish.suoMe.active = !1, this.RedT.player.fish.unLock(this.RedT.player.map), cc.RedT.send({ g: { fish: { unlock: !0 } } }));
                this.offLock()
            },
            fire: function(t) { this.RedT.isLock ? (this.collider.enabled = !0, this.RedT.angleSung(t), this.RedT.shubiao.dragonBones.playAnimation("newAnimation", 1)) : this.RedT.angleSung(t, !0) }
        }), cc._RF.pop()
    }, {}],
    ForGotPass: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "71d268vawpEd7jT7rX6zxb6", "ForGotPass");
        var n = t("BrowserUtil");
        t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { username: { default: null, type: cc.EditBox }, newpass: { default: null, type: cc.EditBox }, renewpass: { default: null, type: cc.EditBox }, otp: { default: null, type: cc.EditBox }, captcha: { default: null, type: cc.EditBox }, capchaSprite: cc.Sprite },
            onLoad: function() {
                var t = this;
                this.editboxs = [this.username, this.newpass, this.renewpass, this.otp, this.captcha], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onForGotClick(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.escape ? (cc.RedT.inGame.dialog.onClickBack(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent(), this.node.runAction(cc.RedT.inGame.dialog.actionShow), this.reCaptcha() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean(), cc.RedT.inGame.dialog.resetSizeDialog(this.node) },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.escape:
                        this.isTop() && cc.RedT.inGame.dialog.onClickBack();
                        break;
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onForGotClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.username.string = this.newpass.string = this.renewpass.string = this.otp.string = this.captcha.string = "" },
            onForGotClick: function() { this.username.string.length < 3 || this.username.string.length > 32 ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "Vui l\xf2ng nh\u1eadp ch\xednh x\xe1c t\xean t\xe0i kho\u1ea3n..." }) : null === this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "T\xean t\xe0i kho\u1ea3n ch\u1ec9 g\u1ed3m Ch\u1eef v\xe0 S\u1ed1!" }) : this.newpass.string.length < 6 || this.newpass.string.length > 32 ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "\u0110\u1ed9 d\xe0i m\u1eadt kh\u1ea9u t\u1ed1i thi\u1ec3u 6-32 k\xed t\u1ef1..." }) : this.newpass.string.length != this.renewpass.string.length ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u kh\xf4ng \u0111\xfang..." }) : 4 != this.otp.string.length ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "M\xe3 OTP kh\xf4ng h\u1ee3p l\u1ec7..." }) : 4 != this.captcha.string.length ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "Captcha kh\xf4ng \u0111\xfang." }) : cc.RedT.send({ forgotpass: { iforgot: { name: this.username.string, pass: this.newpass.string, otp: this.otp.string, captcha: this.captcha.string } } }) },
            initCaptcha: function(t) {
                var e = this,
                    i = new Image;
                i.src = t, i.width = 150, i.height = 50, setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(i), t.handleLoadedTexture();
                    var n = new cc.SpriteFrame(t);
                    e.capchaSprite.spriteFrame = n
                }, 10)
            },
            reCaptcha: function() { cc.RedT.send({ captcha: "forgotpass" }) },
            onClickOTP: function() {
                this.username.string.trim();
                this.username.string.length < 3 || this.username.string.length > 32 ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "Vui l\xf2ng nh\u1eadp ch\xednh x\xe1c t\xean t\xe0i kho\u1ea3n..." }) : cc.RedT.send({ forgotpass: { sendOTP: this.username.string } })
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    GIFSprite: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "032a1A/NzNMGKNUZQjfj0rI", "GIFSprite"), Object.defineProperty(i, "__esModule", { value: !0 });
        var n = t("./GIF"),
            o = cc._decorator,
            c = o.ccclass,
            s = o.property,
            a = o.requireComponent,
            h = o.disallowMultiple,
            r = o.executeInEditMode,
            d = function(t) {
                function e() { var e = null !== t && t.apply(this, arguments) || this; return e._path = null, e.sprite = null, e._length = 0, e._index = 0, e.maxWith = 0, e.maxHeight = 0, e.stayAtFirstFrame = !1, e.fitHeight = !0, e.fitWidth = !0, e }
                return __extends(e, t), Object.defineProperty(e.prototype, "path", { get: function() { return this._path }, set: function(t) { null != t && (this._path = t, this.innerPath = t.toString(), this.clear(), this.applayChange()) }, enumerable: !1, configurable: !0 }), e.prototype.setInnerPath = function(t) { this.innerPath = t, this.clear(), this.applayChange() }, e.prototype.onLoad = function() { this.sprite = this.node.getComponent(cc.Sprite) }, e.prototype.start = function() { this.path && this.setInnerPath(this.path.toString()) }, e.prototype.setDefaultSpriteFrame = function(t) {
                    var e = t.getOriginalSize(),
                        i = 0,
                        n = 0,
                        o = 0;
                    if (this.fitHeight && !this.fitWidth) n = (i = this.maxHeight / e.height) * e.width, o = this.maxHeight;
                    else if (!this.fitHeight && this.fitWidth) i = this.maxWith / e.width, n = this.maxWith, o = i * e.height;
                    else { this.maxWith / this.maxHeight > e.width / e.height ? (n = (i = this.maxHeight / e.height) * e.width, o = this.maxHeight) : (i = this.maxWith / e.width, n = this.maxWith, o = i * e.height) }
                    this.node.setContentSize(cc.size(n, o)), this.sprite.spriteFrame = t
                }, e.prototype.inited = function() {
                    var t = this;
                    this._index++, this._index >= this._spriteFrames.length && (this._index = 0);
                    var e = this._spriteFrames[this._index];
                    this.sprite.spriteFrame = e;
                    var i = this._delays[this._index];
                    !i || i < .01 ? i = .06 : i *= .01, this.scheduleOnce(function() { t.inited() }, i)
                }, e.prototype.getType = function() { var t = n.FileType.UNKNOWN; return t }, e.prototype.applayChange = function() {
                    var t = this,
                        e = n.GIFCache.getInstance(),
                        i = function(i, n) { i ? cc.error("gif\u56fe\u7247\u52a0\u8f7d\u5931\u8d25") : n instanceof cc.Texture2D ? t.setDefaultSpriteFrame(new cc.SpriteFrame(n)) : (t._delays = n.delays, t._spriteFrames = n.spriteFrames, t._spriteFrames = n.spriteFrames, t._positions = n.positions, t.setDefaultSpriteFrame(n.spriteFrames[0]), t.stayAtFirstFrame || t.scheduleOnce(function() { t.inited() }, .1), t._inited = !0, e.addItemFrame(t.innerPath, n)) },
                        o = n.FileType.UNKNOWN,
                        c = e.get(this.innerPath);
                    c ? o = c.type : (o = this.getType(), e.addItemType(this.innerPath, o)), o == n.FileType.GIF ? e.hasFrame(this.innerPath) ? i(null, c.frameData) : cc.loader.load({ url: this.innerPath, type: "gif" }, i) : cc.loader.load(this.innerPath, i)
                }, e.prototype.clear = function() { this.node.stopAllActions(), this._index = 0, this._inited = null, this._delays = null, this._spriteFrames = null, this.unscheduleAllCallbacks() }, __decorate([s({ visible: !1 })], e.prototype, "_path", void 0), __decorate([s({ type: cc.Asset })], e.prototype, "path", null), __decorate([s(cc.Integer)], e.prototype, "maxWith", void 0), __decorate([s(cc.Integer)], e.prototype, "maxHeight", void 0), __decorate([s(cc.Boolean)], e.prototype, "stayAtFirstFrame", void 0), __decorate([s(cc.Boolean)], e.prototype, "fitHeight", void 0), __decorate([s(cc.Boolean)], e.prototype, "fitWidth", void 0), e = __decorate([c, r, h, a(cc.Sprite)], e)
            }(cc.Component);
        i.default = d, cc._RF.pop()
    }, { "./GIF": "GIF" }],
    GIF: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5b652UmXqhIsIi9Lax3MTNI", "GIF"), Object.defineProperty(i, "__esModule", { value: !0 }), i.GIFCache = i.GIF = i.FileHead = i.FileType = void 0;
        var n, o = t("./LZW");
        (function(t) { t[t.UNKNOWN = 0] = "UNKNOWN", t[t.PNG = 1] = "PNG", t[t.JPG = 2] = "JPG", t[t.GIF = 3] = "GIF", t[t.WEBP = 4] = "WEBP" })(n = i.FileType || (i.FileType = {}));
        var c = function() {
            function t() {}
            return t.IMAGE_PNG = "89504e47", t.IMAGE_JPG = "ffd8ff", t.IMAGE_GIF = "474946", t.RIFF = "52494646", t.WEBP_RIFF = t.RIFF, t.WEBP_WEBP = "57454250", t
        }();
        i.FileHead = c;
        var s = function() {
            function t() { this._offset = 0, this._info = { header: "", frames: [], comment: "" }, this._delays = [], this._spriteFrames = [], this._canvas = null, this._context = null, this.id = "GIF", this.async = !0 }
            return Object.defineProperty(t.prototype, "buffer", { get: function() { return this._buffer }, set: function(t) { this.clear(), this._buffer = t, this._view = new Uint8Array(t) }, enumerable: !1, configurable: !0 }), t.prototype.handle = function(t, e) { this.buffer = t.content, this.getHeader(), this.getScrDesc(), this.getTexture(), 0 == this._spriteFrames.length ? e(new Error("gif\u52a0\u8f7d\u5931\u8d25,\u5e27\u957f\u5ea6\u4e3a0")) : e(null, { delays: this._delays, spriteFrames: this._spriteFrames, length: this._info.frames.length }) }, t.detectFormat = function(t) { return -1 != t.indexOf(c.IMAGE_GIF) ? n.GIF : -1 != t.indexOf(c.IMAGE_PNG) ? n.PNG : -1 != t.indexOf(c.IMAGE_JPG) ? n.JPG : -1 != t.indexOf(c.WEBP_RIFF) && -1 != t.indexOf(c.WEBP_WEBP) ? n.WEBP : n.UNKNOWN }, t.bytes2HexString = function(t) {
                for (var e = "", i = 0; i < t.length; i++) {
                    var n, o = t[i];
                    1 == (n = o < 0 ? (255 + o + 1).toString(16) : o.toString(16)).length && (n = "0" + n), e += n
                }
                return e
            }, t.prototype.getTexture = function() {
                for (var t = 0, e = 0, i = this._info.frames; e < i.length; e++) {
                    var n = i[e];
                    this.decodeFrame2Texture(n, t++)
                }
            }, t.prototype.getSpriteFrame = function(t) { return this._spriteFrames[t] ? this._spriteFrames[t] : this.decodeFrame2Texture(this._info.frames[t], t) }, t.prototype.decodeFrame = function(t) { var e = this._context.getImageData(t.img.x, t.img.y, t.img.w, t.img.h); return t.img.m ? this._tab = t.img.colorTab : this._tab = this._info.colorTab, o.default.decode(t.img.srcBuf, t.img.codeSize).forEach(function(i, n) { e.data[4 * n] = this._tab[3 * i], e.data[4 * n + 1] = this._tab[3 * i + 1], e.data[4 * n + 2] = this._tab[3 * i + 2], e.data[4 * n + 3] = 255, t.ctrl.t && (i == t.ctrl.tranIndex && (e.data[4 * n + 3] = 0)) }.bind(this)), e }, t.prototype.mergeFrames = function(t, e) {
                var i = e;
                if (t)
                    for (var n = 0; n < i.data.length; n += 4) 0 == i.data[n + 3] && (i.data[n] = this._lastData.data[n], i.data[n + 1] = this._lastData.data[n + 1], i.data[n + 2] = this._lastData.data[n + 2], i.data[n + 3] = this._lastData.data[n + 3]);
                return i
            }, t.prototype.dataUrl2SpriteFrame = function(t) {
                var e = new cc.Texture2D,
                    i = new cc.SpriteFrame,
                    n = new Image;
                return n.src = t, e.initWithElement(n), i.setTexture(e), i
            }, t.prototype.date2SpriteFrame = function(t, e, i) {
                var n = new cc.RenderTexture,
                    o = new cc.SpriteFrame;
                return n.initWithData(t.data, cc.Texture2D.PixelFormat.RGBA8888, e, i), o.setTexture(n), o
            }, t.prototype.putImageDataJSB = function(t, e, i, n) {
                var o = this,
                    c = function() {
                        for (var n = 0; n < t.height; n++)
                            for (var c = 0; c < t.width; c++) {
                                var s = 4 * n * t.width + 4 * c,
                                    a = 4 * (n + i) * o._lastData.width + 4 * (c + e);
                                0 != t.data[s + 3] && (o._lastData.data[a] = t.data[s], o._lastData.data[a + 1] = t.data[s + 1], o._lastData.data[a + 2] = t.data[s + 2], o._lastData.data[a + 3] = t.data[s + 3])
                            }
                    },
                    s = function() {
                        for (var n = 0; n < o._lastData.height; n++)
                            for (var c = 0; c < o._lastData.width; c++) {
                                var s = 4 * n * o._lastData.width + 4 * c,
                                    a = 4 * (n - i) * t.width + 4 * (c - e),
                                    h = !1;
                                (c < e || c > e + t.width) && (h = !0), (n < i || n > i + t.height) && (h = !0), h ? (o._lastData.data[s + 0] = 0, o._lastData.data[s + 1] = 0, o._lastData.data[s + 2] = 0, o._lastData.data[s + 3] = 0) : (o._lastData.data[s + 0] = t.data[a + 0], o._lastData.data[s + 1] = t.data[a + 1], o._lastData.data[s + 2] = t.data[a + 2], o._lastData.data[s + 3] = t.data[a + 3])
                            }
                    };
                4 == t.data[0] && 0 == t.data[1] && 0 == t.data[2] && 0 == t.data[3] || (1 == n.ctrl.disp || 0 == n.ctrl.disp ? c() : 2 == n.ctrl.disp ? s() : ! function() {
                    for (var e = 0, i = 0; i < t.height; i += 2) {
                        for (var n = 0, o = 0; o < t.width; o++) {
                            var c = 4 * i * t.width + 4 * o;
                            0 == t.data[c + 3] && n++
                        }
                        if (n / t.width > .1 && e++, e / (t.height / 2) > .6) return !0
                    }
                    return !1
                }() ? c() : s())
            }, t.prototype.putImageDataWeb = function(t, e) {
                var i;
                if (1 == e.ctrl.disp || 0 == e.ctrl.disp) {
                    this._context.putImageData(t, e.img.x, e.img.y, 0, 0, e.img.w, e.img.h);
                    var n = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height),
                        o = this._lastData;
                    i = this.mergeFrames(o, n)
                } else this._context.clearRect(0, 0, this._canvas.width, this._canvas.height), this._context.putImageData(t, e.img.x, e.img.y, 0, 0, e.img.w, e.img.h), i = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
                return this._context.putImageData(i, 0, 0), this._lastData = i, this._canvas.toDataURL()
            }, t.prototype.decodeFrame2Texture = function(t, e) {
                this._context || (this._canvas = document.createElement("canvas"), this._context = this._canvas.getContext("2d"), this._canvas.width = t.img.w, this._canvas.height = t.img.h);
                var i = this.decodeFrame(t);
                this._delays[e] = t.ctrl.delay;
                var n = this.putImageDataWeb(i, t);
                return this._spriteFrames[e] = this.dataUrl2SpriteFrame(n), this._spriteFrames[e]
            }, t.prototype.read = function(t) { return this._view.slice(this._offset, this._offset += t) }, t.prototype.getHeader = function() { this._info.header = "", this.read(6).forEach(function(t, e, i) { this._info.header += String.fromCharCode(t) }.bind(this)) }, t.prototype.getScrDesc = function() {
                var t = this.read(7);
                this._info.w = t[0] + (t[1] << 8), this._info.h = t[2] + (t[3] << 8), this._info.m = 1 & t[4] >> 7, this._info.cr = 7 & t[4] >> 4, this._info.s = 1 & t[4] >> 3, this._info.pixel = 7 & t[4], this._info.bgColor = t[5], this._info.radio = t[6], this._info.m && (this._info.colorTab = this.read(3 * (2 << this._info.pixel))), this.decode()
            }, t.prototype.decode = function() {
                var t = [],
                    e = this.read(1);
                switch (e[0]) {
                    case 33:
                        this.extension();
                        break;
                    case 44:
                        for (e = this.read(9), this._frame.img = { x: e[0] + (e[1] << 8), y: e[2] + (e[3] << 8), w: e[4] + (e[5] << 8), h: e[6] + (e[7] << 8), colorTab: 0 }, this._frame.img.m = 1 & e[8] >> 7, this._frame.img.i = 1 & e[8] >> 6, this._frame.img.s = 1 & e[8] >> 5, this._frame.img.r = 3 & e[8] >> 3, this._frame.img.pixel = 7 & e[8], this._frame.img.m && (this._frame.img.colorTab = this.read(3 * (2 << this._frame.img.pixel))), this._frame.img.codeSize = this.read(1)[0], t = [];;) {
                            if (!(e = this.read(1))[0]) { this._frame.img.srcBuf = t, this.decode(); break }
                            this.read(e[0]).forEach(function(e, i, n) { t.push(e) })
                        }
                        break;
                    case 59:
                        console.log("The end.", this._offset, this.buffer.byteLength)
                }
            }, t.prototype.extension = function() {
                var t = this.read(1);
                switch (t[0]) {
                    case 255:
                        if (11 != this.read(1)[0]) throw new Error("\u89e3\u6790\u51fa\u9519");
                        for (this._info.appVersion = "", this.read(11).forEach(function(t, e, i) { this._info.appVersion += String.fromCharCode(t) }.bind(this));;) {
                            if (!(t = this.read(1))[0]) { this.decode(); break }
                            this.read(t[0])
                        }
                        break;
                    case 249:
                        if (4 != this.read(1)[0]) throw new Error("\u89e3\u6790\u51fa\u9519");
                        if (t = this.read(4), this._frame = {}, this._frame.ctrl = { disp: 7 & t[0] >> 2, i: 1 & t[0] >> 1, t: 1 & t[0], delay: t[1] + (t[2] << 8), tranIndex: t[3] }, this._info.frames.push(this._frame), 0 != this.read(1)[0]) throw new Error("\u89e3\u6790\u51fa\u9519");
                        this.decode();
                        break;
                    case 254:
                        (t = this.read(1))[0] && (this.read(t[0]).forEach(function(t, e, i) { this._info.comment += String.fromCharCode(t) }), 0 == this.read(1)[0] && this.decode())
                }
            }, t.prototype.clear = function() { this._tab = null, this._view = null, this._frame = null, this._offset = 0, this._info = { header: "", frames: [], comment: "" }, this._lastData = null, this._delays = [], this._spriteFrames = [], this._canvas = null, this._context = null }, t
        }();
        i.GIF = s;
        var a = function() {
            function t() { this.gifFrameMap = {} }
            return t.getInstance = function() {
                return t.instance || (t.instance = new t, cc.loader.addDownloadHandlers({ gif: cc.loader.downloader.extMap.binary }), cc.loader.addLoadHandlers({
                    gif: function(t, e) {
                        (new s).handle(t, e)
                    }
                })), t.instance
            }, t.prototype.preloadGif = function(t) { try { t.words && t.words.forEach(function(t) {-1 != t.indexOf(".gif") && cc.loader.load(t.img, function(t, e) {}) }), t.classes && t.classes.forEach(function(t) {-1 != t.indexOf(".gif") && cc.loader.load(t.img, function(t, e) {}) }) } catch (t) { cc.log(t) } }, t.prototype.addItemFrame = function(t, e) {
                if (1 == this.has(t)) {
                    var i = this.get(t);
                    i.referenceCount++, i.frameData = e
                } else {
                    var o = { referenceCount: 0, type: n.GIF, frame: {} };
                    this.gifFrameMap[t] = o
                }
            }, t.prototype.addItemType = function(t, e) {
                if (this.has(t)) { this.get(t).type = e } else {
                    var i = { referenceCount: 0, type: e, frame: null };
                    this.gifFrameMap[t] = i
                }
            }, t.prototype.add = function(t, e) { this.has(t) || (this.gifFrameMap[t] = e) }, t.prototype.get = function(t) { return this.gifFrameMap[t] }, t.prototype.has = function(t) { return void 0 != this.gifFrameMap[t] }, t.prototype.hasFrame = function(t) { var e = this.get(t); if (void 0 != e && null != e.frameData) return !0; return !1 }, t.prototype.relase = function(t) { this.has(t) && (this.gifFrameMap[t] = void 0, cc.loader.release(t)) }, t.prototype.releaseAll = function() {
                for (var t in this.gifFrameMap) cc.loader.release(t);
                this.gifFrameMap = {}
            }, t.instance = null, t
        }();
        i.GIFCache = a, cc._RF.pop()
    }, { "./LZW": "LZW" }],
    GiftCode: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ffeb6RH/gdFxI6pq25qidEr", "GiftCode");
        var n = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { giftcode: { default: null, type: cc.EditBox }, captcha: { default: null, type: cc.EditBox }, capchaSprite: cc.Sprite },
            onLoad: function() {
                var t = this;
                this.editboxs = [this.giftcode, this.captcha], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onSendClick(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.escape ? (cc.RedT.inGame.dialog.onClickBack(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent(), this.node.runAction(cc.RedT.inGame.dialog.actionShow), this.reCaptcha() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean(), cc.RedT.inGame.dialog.resetSizeDialog(this.node) },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.escape:
                        this.isTop() && cc.RedT.inGame.dialog.onClickBack();
                        break;
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onSendClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.giftcode.string = this.captcha.string = "" },
            onSendClick: function() {
                var t = null;
                this.giftcode.string.length > 32 || this.giftcode.string.length < 3 ? t = "M\xe3 Giftcode kh\xf4ng h\u1ee3p l\u1ec7..." : this.captcha.string.length < 4 && (t = "Vui l\xf2ng nh\u1eadp Captcha."), t ? cc.RedT.inGame.notice.show({ title: "GIFT CODE", text: t }) : cc.RedT.send({ giftcode: { code: this.giftcode.string, captcha: this.captcha.string } })
            },
            initCaptcha: function(t) {
                var e = this,
                    i = new Image;
                i.src = t, i.width = 150, i.height = 50, setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(i), t.handleLoadedTexture();
                    var n = new cc.SpriteFrame(t);
                    e.capchaSprite.spriteFrame = n
                }, 10)
            },
            reCaptcha: function() { cc.RedT.send({ captcha: "giftcode" }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil" }],
    Header: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "53591NaLdpJxoW9GVWXh0FR", "Header"), cc.Class({ extends: cc.Component, properties: { avatar: cc.Sprite, nodeUsers: cc.Node, nodeGuest: cc.Node, userName: cc.Label, vip: cc.Label, userRed: cc.Label, maskFull: 0 }, onLoad: function() { cc.RedT.IS_LOGIN ? this.isSignIn() : this.isSignOut() }, isSignIn: function() { this.nodeUsers.active = !0, this.nodeGuest.active = !1 }, isSignOut: function() { this.userName.string = this.userRed.string = "", this.nodeUsers.active = !1, this.nodeGuest.active = !0 }, level: function(t) { this.vip.string = "VIP" + t }, updateEXP: function(t, e) {}, activePhone: function(t) {}, reset: function() { this.level(cc.RedT.user.level), this.updateEXP(cc.RedT.user.vipHT, cc.RedT.user.vipNext) } }), cc._RF.pop()
    }, {}],
    Helper: [function(t, e, i) {
        "use strict";

        function n(t) { if (t) { var e = (t = parseInt(t)).toString().split("."); return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."), e.join(".") } return "0" }
        cc._RF.push(e, "ea8443jZShFSboJocQ6Ztdo", "Helper"), e.exports = {
            checkPhoneValid: function(t) { return /^[\+]?(?:[(][0-9]{1,3}[)]|(?:81|82|84|0))[0-9]{7,11}$/im.test(t) },
            nFormatter: function(t, e) {
                for (var i = [{ value: 1e18, symbol: "E" }, { value: 1e15, symbol: "P" }, { value: 1e12, symbol: "T" }, { value: 1e9, symbol: "G" }, { value: 1e6, symbol: "M" }, { value: 1e3, symbol: "k" }], n = /\.0+$|(\.[0-9]*[1-9])0+$/, o = 0; o < i.length; o++)
                    if (t >= i[o].value) return (t / i[o].value).toFixed(e).replace(n, "$1") + i[o].symbol;
                return t.toFixed(e).replace(n, "$1")
            },
            numberWithCommas: n,
            isEmpty: function(t) { return !t || 0 === t.length },
            getOnlyNumberInString: function(t) { var e = t.match(/\d+/g); return e ? e.join("") : "" },
            numberPad: function(t, e) { for (var i = "" + t; i.length < e;) i = "0" + i; return i },
            inputNumber: function(t) {
                var e = !1;
                t.addEventListener("keydown", function(t) { 16 === t.keyCode && (t.preventDefault(), e = !0) }), t.addEventListener("keyup", function(t) { 16 === t.keyCode && (t.preventDefault(), e = !1) }), t.addEventListener("keydown", function(t) {!e && (t.keyCode >= 48 && t.keyCode <= 57 || t.keyCode >= 96 && t.keyCode <= 105 || t.keyCode >= 37 && t.keyCode <= 40 || 107 === t.keyCode || 109 === t.keyCode || 189 === t.keyCode || 8 === t.keyCode || 13 === t.keyCode) || t.preventDefault() })
            },
            anPhanTram: function(t, e, i, n) { void 0 === n && (n = !1); var o = n ? v1 : t; return t * e - Math.ceil(o * i / 100) },
            numberTo: function(t, e, i, o, c) {
                void 0 === c && (c = !1), clearInterval(t.timer);
                var s = i - e,
                    a = Math.abs(Math.floor(o / s));
                a = Math.max(a, 50);
                var h = (new Date).getTime() + o;
                t.timer = setInterval(function() {
                    if (t.node) {
                        var e = (new Date).getTime(),
                            a = Math.max((h - e) / o, 0),
                            r = i - a * s >> 0;
                        t.string = c ? n(r) : r, r == i && clearInterval(t.timer)
                    } else clearInterval(t.timer)
                }, a)
            },
            getStringDateByTime: function(t) {
                var e = new Date(t),
                    i = e.getHours(),
                    n = e.getMinutes(),
                    o = e.getDate(),
                    c = e.getMonth() + 1;
                return i < 10 && (i = "0" + i), n < 10 && (n = "0" + n), o < 10 && (o = "0" + o), c < 10 && (c = "0" + c), i + ":" + n + " " + o + "/" + c + "/" + e.getFullYear()
            },
            getStringHourByTime: function(t) {
                var e = new Date(t),
                    i = e.getHours(),
                    n = e.getMinutes(),
                    o = e.getSeconds();
                return i < 10 && (i = "0" + i), n < 10 && (n = "0" + n), o < 10 && (o = "0" + o), i + ":" + n + ":" + o
            },
            numberToTime: function(t) {
                t < 0 && (t = 0), t = parseInt(t);
                var e = parseInt(t / 60),
                    i = t % 60;
                return e < 10 && (e = "0" + e), i < 10 && (i = "0" + i), e + ":" + i
            },
            validateEmail: function(t) { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t) },
            addZero10: function(t) { return t < 10 && (t = "0" + t), t }
        }, cc._RF.pop()
    }, {}],
    Http: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5ef196INn9MhZt8sTU0On87", "Http"), Object.defineProperty(i, "__esModule", { value: !0 });
        var n = cc._decorator,
            o = n.ccclass,
            c = (n.property, function() {
                function t() {}
                return t.post = function(t, e, i) {
                    var n = new XMLHttpRequest,
                        o = "";
                    if (null !== e) {
                        var c = 0,
                            s = Object.keys(e).length;
                        for (var a in e) e.hasOwnProperty(a) && (o += a + "=" + e[a], c < s - 1 && (o += "&")), c++
                    }
                    n.onreadystatechange = function() {
                        if (4 === n.readyState)
                            if (200 === n.status) {
                                var t = null,
                                    e = null;
                                try { t = JSON.parse(n.responseText) } catch (t) { e = t }
                                i(e, t)
                            } else i(n.status, null)
                    }, n.open("POST", encodeURI(t), !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send(o)
                }, t.get = function(t, e, i) {
                    var n = new XMLHttpRequest,
                        o = "";
                    if (null !== (e = e || {})) {
                        var c = 0,
                            s = Object.keys(e).length;
                        for (var a in e) e.hasOwnProperty(a) && (o += a + "=" + e[a], c++ < s - 1 && (o += "&"))
                    }
                    n.onreadystatechange = function() {
                        if (4 === n.readyState)
                            if (200 === n.status) {
                                var t = null,
                                    e = null;
                                try { t = JSON.parse(n.responseText) } catch (t) { e = t }
                                i(e, t)
                            } else i(n.status, null)
                    }, n.open("GET", encodeURI(t + "?" + o), !0), n.send()
                }, t = __decorate([o], t)
            }());
        i.default = c, cc._RF.pop()
    }, {}],
    KetSat: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b4e75BUyTlCYKT+0A4g+bCK", "KetSat");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { header: { default: null, type: cc.Node }, body: { default: null, type: cc.Node }, redHT: { default: null, type: cc.Label }, redKet: { default: null, type: cc.Label }, buttonALL: { default: null, type: cc.Label }, buttonAc: { default: null, type: cc.Label }, inputGui: { default: null, type: cc.EditBox }, inputRut: { default: null, type: cc.EditBox }, inputOTP: { default: null, type: cc.EditBox }, isGui: !0 },
            init: function() { this.header = this.header.children.map(function(t) { return t.getComponent("itemContentMenu") }) },
            onSelectHead: function(t, e) { this.header.forEach(function(t) { t.node.name == e ? t.select() : t.unselect() }), this.body.children.forEach(function(t) { t.name == e ? t.active = !0 : t.active = !1 }), this.clear(), this.body.children[0].active ? (this.isGui = !0, this.buttonALL.string = "G\u1eecI TO\xc0N B\u1ed8", this.buttonAc.string = "G\u1eecI") : (this.isGui = !1, this.buttonALL.string = "R\xdaT TO\xc0N B\u1ed8", this.buttonAc.string = "R\xdaT") },
            onClickHuy: function() { this.clear() },
            onClickAC: function() {
                var t = {};
                if (this.isGui) { if (t.gui = n.getOnlyNumberInString(this.inputGui.string), t.gui < 1e4) return void cc.RedT.inGame.notice.show({ title: "G\u1eecI RED", text: "S\u1ed1 ti\u1ec1n g\u1eedi ph\u1ea3i l\u1edbn h\u01a1n 10.000" }) } else if (t.rut = { red: n.getOnlyNumberInString(this.inputRut.string), otp: this.inputOTP.string }, t.rut < 1e4) return void cc.RedT.inGame.notice.show({ title: "R\xdaT RED", text: "S\u1ed1 ti\u1ec1n r\xfat ph\u1ea3i l\u1edbn h\u01a1n 10.000" });
                cc.RedT.send({ user: { ket_sat: t } })
            },
            onClickALL: function() { this.isGui ? this.inputGui.string = n.numberWithCommas(cc.RedT.user.red) : this.inputRut.string = this.redKet.string },
            onClickAdd: function(t, e) { this.isGui ? this.inputGui.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.inputGui.string) + 1 * e) : this.inputRut.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.inputRut.string) + 1 * e) },
            onChangerInput: function(t) { t = n.numberWithCommas(n.getOnlyNumberInString(t)), this.isGui ? this.inputGui.string = "0" == t ? "" : t : this.inputRut.string = "0" == t ? "" : t },
            clear: function() { this.inputGui.string = this.inputRut.string = this.inputOTP.string = "" },
            onClickOTP: function() { cc.RedT.send({ otp: !0 }) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    LZW: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "83418KDsWZIz4OcMzvtMTXS", "LZW"), Object.defineProperty(i, "__esModule", { value: !0 });
        var n = function() {
            function t() {}
            return t.decode = function(t, e) {
                var i = 1 << e,
                    n = i + 1,
                    o = e + 1,
                    c = [],
                    s = 0;

                function a() {
                    var t;
                    for (c = [], o = e + 1, t = 0; t < i; t++) c[t] = [t];
                    c[i] = [], c[n] = null
                }

                function h(e) { var i, n = 0; for (i = 0; i < e; i++) t[s >> 3] & 1 << (7 & s) && (n |= 1 << i), s++; return n }
                return function() {
                    for (var t, e, s = [];;)
                        if (e = t, (t = h(o)) != i) {
                            if (t == n) break;
                            if (t < c.length) e !== i && c.push(c[e].concat(c[t][0]));
                            else {
                                if (t !== c.length) throw new Error("LZW\u89e3\u6790\u51fa\u9519");
                                c.push(c[e].concat(c[e][0]))
                            }
                            s.push.apply(s, c[t]), c.length === 1 << o && o < 12 && o++
                        } else a();
                    return s
                }()
            }, t
        }();
        i.default = n, cc._RF.pop()
    }, {}],
    LichSuAll_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "62e93m9/BxGla7GXyLkosS7", "LichSuAll_item"), cc.Class({ extends: cc.Component, properties: { MaGD: cc.Label, Time: cc.Label, DichVu: cc.Label, PhatSinh: cc.Label, SoDu: cc.Label, Status: cc.Label } }), cc._RF.pop()
    }, {}],
    LichSuAll: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "00dc6FpPzNO8b/DrupiO2DY", "LichSuAll");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node },
            onLoad: function() { this.content = this.content.children.map(function(t) { return t.getComponent("LichSuAll_item") }) },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ user: { history: { user_history: { page: t } } } }) },
            onData: function(t) {
                this.content.forEach(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, e.MaGD.string = o.id, e.Time.string = n.getStringDateByTime(o.time), e.DichVu.string = o.content, e.PhatSinh.string = n.numberWithCommas(o.amount), parseInt(o.amount) < 0 ? e.PhatSinh.node.color = cc.color(195, 9, 9, 255) : e.PhatSinh.node.color = cc.Color.WHITE, e.SoDu.string = n.numberWithCommas(o.balance)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    LichSuBank_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "907c0wFO7lM9YafdKBVYX1S", "LichSuBank_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: { default: null, type: cc.Label }, bank: { default: null, type: cc.Label }, act: { default: null, type: cc.Label }, money: { default: null, type: cc.Label }, info: { default: null, type: cc.Label }, status: { default: null, type: cc.Label } } }), cc._RF.pop()
    }, {}],
    LichSuBank: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cfe16ZuJ1pCdIWy4Ytc2scR", "LichSuBank");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node },
            onLoad: function() { this.content = this.content.children.map(function(t) { return t.getComponent("LichSuBank_item") }) },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ user: { history: { bank: { page: t } } } }) },
            onData: function(t) {
                this.content.forEach(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, e.time.string = n.getStringDateByTime(o.time), e.bank.string = o.bank.toUpperCase(), e.act.string = 0 == o.type ? "N\u1ea0P" : "R\xdaT", e.money.string = n.numberWithCommas(o.money), e.money.node.color = 0 == o.type ? cc.color(199, 39, 39, 255) : cc.color(201, 16, 178, 255), e.info.string = o.info ? o.info : "", e.status.string = 0 == o.status ? "Ch\u1edd Duy\u1ec7t" : 1 == o.status ? "Th\xe0nh C\xf4ng" : 2 == o.status ? "Th\u1ea5t B\u1ea1i" : "", e.status.node.color = 0 == o.status ? cc.color(195, 130, 14, 255) : 1 == o.status ? cc.color(0, 129, 6, 255) : 2 == o.status ? cc.color(236, 6, 6, 255) : cc.color(45, 171, 255, 255)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    LichSuChuyen_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cefe2VTU9FJuZ3eLrltioL8", "LichSuChuyen_item"), cc.Class({ extends: cc.Component, properties: { Time: cc.Label, uFrom: cc.Label, uTo: cc.Label, Chuyen: cc.Label, Nhan: cc.Label, nodeMesenger: cc.Node }, onShowMesenger: function() { cc.RedT.inGame.notice.show({ title: "L\u1edcI NH\u1eaeN", text: this.mesenger }) } }), cc._RF.pop()
    }, {}],
    LichSuChuyen: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "943527q5XpHKJiZmmGFO1UX", "LichSuChuyen");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: { default: null, type: cc.Node } },
            onLoad: function() {
                var t = this;
                Promise.all(this.content.children.map(function(t) { return t.getComponent("LichSuChuyen_item") })).then(function(e) { t.content = e })
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ user: { history: { chuyen_red: { page: t } } } }) },
            onData: function(t) {
                Promise.all(this.content.map(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, e.Time.string = n.getStringDateByTime(o.time), e.uFrom.string = o.from, e.uTo.string = o.to, e.Chuyen.string = n.numberWithCommas(o.red), e.Nhan.string = n.numberWithCommas(o.red_c), void 0 !== o.message ? (e.nodeMesenger.active = !0, e.mesenger = o.message) : (e.nodeMesenger.active = !1, e.mesenger = null)) : e.node.active = !1
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    LichSuMuaXu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b2292sqRptHdJi8HS34a///", "LichSuMuaXu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: { default: null, type: cc.Node } },
            onLoad: function() {
                var t = this;
                Promise.all(this.content.children.map(function(t) { return t.getComponent("LichSuNap_item") })).then(function(e) { t.content = e })
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ user: { history: { mua_xu: { page: t } } } }) },
            onData: function(t) {
                Promise.all(this.content.map(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, e.GD.string = o.id ? o.id : "", e.Time.string = n.getStringDateByTime(o.time), e.NhaMang.string = n.numberWithCommas(o.red), e.MenhGia.string = n.numberWithCommas(o.xu)) : e.node.active = !1
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    LichSuNap_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d2bc727HRVCxpX4Pq1ee9Tu", "LichSuNap_item"), cc.Class({ extends: cc.Component, properties: { MaGD: cc.Label, Time: cc.Label, NhaMang: cc.Label, MenhGia: cc.Label, Nhan: cc.Label, pin: cc.Label, seri: cc.Label, Status: cc.Label } }), cc._RF.pop()
    }, {}],
    LichSuNap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b3ba05EetBCV4Zd4FnrDzNm", "LichSuNap");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node },
            onLoad: function() { this.content = this.content.children.map(function(t) { return t.getComponent("LichSuNap_item") }) },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ user: { history: { nap_red: { page: t } } } }) },
            onData: function(t) {
                this.content.forEach(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, e.Time.string = n.getStringDateByTime(o.time), e.NhaMang.string = o.nhaMang, e.MenhGia.string = n.numberWithCommas(o.menhGia), e.Nhan.string = n.numberWithCommas(o.nhan), e.pin.string = o.maThe, e.seri.string = o.seri, e.Status.string = 0 == o.status ? "Ch\u1edd duy\u1ec7t" : 1 == o.status ? "Th\xe0nh c\xf4ng" : 2 == o.status ? "Th\u1ebb sai" : "", e.Status.node.color = 0 == o.status ? cc.color(9, 121, 195, 255) : 1 == o.status ? cc.color(14, 151, 2, 255) : 2 == o.status ? cc.color(195, 9, 9, 255) : cc.color(9, 121, 195, 255)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    LichSuRut_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f9622W0MQ9AOJN08zkYjgg8", "LichSuRut_item"), cc.Class({ extends: cc.Component, properties: { Time: cc.Label, NhaMang: cc.Label, MenhGia: cc.Label, SoLuong: cc.Label, Cost: cc.Label, Status: cc.Label }, onInfoClick: function() { this.info && (cc.RedT.inGame.dialog.lichSuGiaoDich.lichSuRut.isView = !0, cc.RedT.inGame.dialog.the_cao.getData(this.idT), cc.RedT.audio.playClick()) } }), cc._RF.pop()
    }, {}],
    LichSuRut: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "725d0Pb9ORLDYbFhFG7zANv", "LichSuRut");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node },
            onLoad: function() { this.isView = !1, this.content = this.content.children.map(function(t) { return t.getComponent("LichSuRut_item") }) },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), !this.isView && cc.RedT.send({ user: { history: { mua_the: { page: t } } } }), this.isView = !1 },
            onData: function(t) {
                this.content.forEach(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, e.Time.string = n.getStringDateByTime(o.time), e.NhaMang.string = o.nhaMang, e.MenhGia.string = n.numberWithCommas(o.menhGia), e.SoLuong.string = o.soLuong, e.Cost.string = n.numberWithCommas(o.Cost), e.Status.string = 0 == o.status ? "Ch\u1edd duy\u1ec7t" : 1 == o.status ? "Th\xe0nh c\xf4ng" : 2 == o.status ? "B\u1ecb Hu\u1ef7" : "", e.Status.node.color = 0 == o.status ? cc.color(9, 121, 195, 255) : 1 == o.status ? cc.color(14, 151, 2, 255) : 2 == o.status ? cc.color(195, 9, 9, 255) : cc.color(9, 121, 195, 255), 1 == o.status ? (e.idT = o._id, e.info = !0) : (e.idT = null, e.info = !1)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    LichSu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "450a2pZkQ5Gvb6kVjtcW8zA", "LichSu"), cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, header: cc.Node, lichSuAll: cc.Node, lichSuNap: cc.Node, lichSuRut: cc.Node, lichSuChuyen: cc.Node, lichSuBank: cc.Node },
            onLoad: function() { this.page = cc.instantiate(this.page), this.page.y = -310, this.page.active = !1, this.node.addChild(this.page), this.page = this.page.getComponent("Pagination"), this.page.init(this), this.history = "LichSuAll", this.lichSuAll = this.lichSuAll.getComponent("LichSuAll"), this.lichSuNap = this.lichSuNap.getComponent("LichSuNap"), this.lichSuRut = this.lichSuRut.getComponent("LichSuRut"), this.lichSuChuyen = this.lichSuChuyen.getComponent("LichSuChuyen"), this.lichSuBank = this.lichSuBank.getComponent("LichSuBank"), this.body = [this.lichSuAll.node, this.lichSuNap.node, this.lichSuRut.node, this.lichSuChuyen.node, this.lichSuBank.node], this.header = this.header.children.map(function(t) { return t.getComponent("itemContentMenu") }) },
            onEnable: function() { this.get_data() },
            onSelectHead: function(t, e) { this.history = e, this.header.forEach(function(t) { t.node.name == e ? t.select() : t.unselect() }), this.body.forEach(function(t) { t.name == e ? t.active = !0 : t.active = !1 }) },
            get_data: function(t) {
                switch (void 0 === t && (t = 1), this.history) {
                    case "LichSuAll":
                        this.lichSuAll.get_data(t);
                        break;
                    case "LichSuNap":
                        this.lichSuNap.get_data(t);
                        break;
                    case "LichSuRut":
                        this.lichSuRut.get_data(t);
                        break;
                    case "LichSuChuyen":
                    case "LichSuBank":
                        this.lichSuChuyen.get_data(t)
                }
            },
            onData: function(t) { this.page.onSet(t.page, t.kmess, t.total), void 0 !== t.user_history && this.lichSuAll.onData(t.user_history), void 0 !== t.nap_red && this.lichSuNap.onData(t.nap_red), void 0 !== t.mua_the && this.lichSuRut.onData(t.mua_the), void 0 !== t.chuyen_red && this.lichSuChuyen.onData(t.chuyen_red), void 0 !== t.bank && this.lichSuBank.onData(t.bank) },
            superView: function(t) { this.onSelectHead(null, t) }
        }), cc._RF.pop()
    }, {}],
    MainAudio: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "738b2QcBnhOn7bLV2UFI4l9", "MainAudio"), cc.Class({ extends: cc.Component, properties: { audioClick: { default: null, type: cc.AudioClip }, audioClick2: { default: null, type: cc.AudioClip }, thongbao_jackpot: { default: null, type: cc.AudioClip }, jackpot: { default: null, type: cc.AudioClip }, bigWin: { default: null, type: cc.AudioClip }, moneywin: { default: null, type: cc.AudioClip }, bonus: { default: null, type: cc.AudioClip }, megaWin: { default: null, type: cc.AudioClip }, winHu: { default: null, type: cc.AudioClip }, mainBackground: { default: null, type: cc.AudioSource }, welcome: { default: null, type: cc.AudioSource }, fishHall: { default: null, type: cc.AudioSource }, fishBG1: { default: null, type: cc.AudioSource }, fishBG2: { default: null, type: cc.AudioSource }, bgSlot1: { default: null, type: cc.AudioSource }, bgSlot2: { default: null, type: cc.AudioSource } }, _playSFX: function(t) { cc.RedT.IS_SOUND && cc.audioEngine.playEffect(t, !1) }, playClick: function() { this._playSFX(this.audioClick) }, playUnClick: function() { this._playSFX(this.audioClick2) }, playNoticeJackP: function() { this._playSFX(this.thongbao_jackpot) }, playEf: function(t) { this._playSFX(this[t]) } }), cc._RF.pop()
    }, {}],
    MainGame: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "MainGame");
        (function(t) { t && t.__esModule })(t("./Util/Http"));
        var n = t("Helper"),
            o = t("BaseControll"),
            c = t("Header"),
            s = t("Dialog"),
            a = t("PushNohu"),
            h = t("NewsContents"),
            r = t("bgLoading"),
            d = t("MenuRoom"),
            u = t("Notice");
        cc.Class({
            extends: cc.Component,
            properties: { TopHu: cc.Node, MenuRoom: d, avatars: { default: [], type: cc.SpriteFrame }, PrefabT: { default: [], type: cc.Prefab }, header: c, news: cc.Node, newsContents: h, bgLoading: r, iconVQRed: cc.Node, iconCandy: cc.Node, iconLongLan: cc.Node, iconZeus: cc.Node, iconAvenger: cc.Node, iconMegaJ: cc.Node, redhat: cc.Node, dialog: s, loading: cc.Node, red_Tai: cc.Label, red_Xiu: cc.Label, notice: u, ThongBaoNoHu: a, wssCacert: { type: cc.Asset, default: null }, url: "", fileAPK: "", dataOn: !0, newsOn: !0 },
            onLoad: function() {
                if (cc.sys.isNative && cc.sys.isMobile && jsb.device && jsb.device.setKeepScreenOn && jsb.device.setKeepScreenOn(!0), this.TopHu = this.TopHu.getComponent("popupTopHu"), this.dialog.init(), this.newsContents.init(this), void 0 === cc.RedT ? (cc.RedT = o, cc.RedT.sslPem = this.wssCacert, cc.RedT.init(), cc.RedT.inGame = this, cc.RedT.audio = this.PrefabT[0].data.getComponent("MainAudio"), cc.RedT.audio.bg = cc.RedT.audio.mainBackground, cc.RedT.avatars = this.avatars, cc.RedT.MiniPanel = cc.instantiate(this.PrefabT[1]), cc.RedT.MiniPanel = cc.RedT.MiniPanel.getComponent("MiniPanel")) : (cc.RedT.inGame = this, cc.RedT.audio.bg.pause(), cc.RedT.audio.bg = cc.RedT.audio.mainBackground), cc.RedT.MiniPanel.node.parent = this.redhat, cc.RedT.reconnect(), this.TopHu.init(cc.RedT.MiniPanel), this.iconCandy = this.iconCandy.getComponent("iconGameHu"), this.iconVQRed = this.iconVQRed.getComponent("iconGameHu"), this.iconLongLan = this.iconLongLan.getComponent("iconGameHu"), this.iconZeus = this.iconZeus.getComponent("iconGameHu"), cc.RedT.IS_LOGIN ? (cc.RedT.send({ scene: "home" }), this.header.reset(), this.header.userName.string = cc.RedT.user.name, this.dialog.profile.CaNhan.login_name.string = cc.RedT.user.username, this.dialog.profile.CaNhan.username.string = cc.RedT.user.name, this.dialog.profile.CaNhan.red.string = n.numberWithCommas(cc.RedT.user.red), this.dialog.profile.CaNhan.redKet.string = n.numberWithCommas(cc.RedT.user.ketSat), this.header.userRed.string = this.dialog.profile.KetSat.redHT.string = n.numberWithCommas(cc.RedT.user.red), this.dialog.profile.KetSat.redKet.string = n.numberWithCommas(cc.RedT.user.ketSat), this.dialog.profile.CaNhan.ref_name.string = cc.RedT.user.ref_name, this.dialog.profile.CaNhan.joinedOn.string = n.getStringDateByTime(cc.RedT.user.joinedOn), this.dialog.profile.CaNhan.phone.string = cc.RedT.user.phone, this.dialog.profile.BaoMat.DangKyOTP.statusOTP(!n.isEmpty(cc.RedT.user.phone)), n.isEmpty(cc.RedT.user.phone) ? this.dialog.profile.CaNhan.phoneStatus.string = "" : (this.dialog.profile.BaoMat.DangKyOTP.labelPhone.string = cc.RedT.user.phone, cc.RedT.user.veryphone ? (this.dialog.profile.CaNhan.phoneStatus.string = "\u0110\xe3 X\xe1c Th\u1ef1c", this.dialog.profile.CaNhan.phoneStatus.node.color = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX("06B30D")) : (this.dialog.profile.CaNhan.phoneStatus.string = "Ch\u01b0a X\xe1c Th\u1ef1c", this.dialog.profile.CaNhan.phoneStatus.node.color = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX("FF0000")))) : this.dialog.settings.setMusic(), null == localStorage.getItem("SOUND_BACKGROUND") || cc.RedT.isSoundBackground()) { cc.RedT.setSoundBackground(!0), cc.RedT.audio.bg.play(); var t = setInterval(function() { cc.RedT.audio.bg.clip.loaded && (clearInterval(t), cc.RedT.audio.bg.play()) }.bind(this), 100) }
                cc.sys.isBrowser && (history.pushState(null, null, location.href), window.onpopstate = function() { history.go(1) })
            },
            start: function() {
                cc.RedT.IS_LOGIN || setTimeout(function() {
                    var t = localStorage.getItem("TH"),
                        e = localStorage.getItem("HT");
                    t && e && this.autoAuth({ authentication: { id: t, token: e } })
                }.bind(this), 300)
            },
            autoAuth: function(t) { this.loading.active = !0, null == cc.RedT._socket || 1 != cc.RedT._socket.readyState ? setTimeout(function() { cc.RedT.send(t) }, 300) : cc.RedT.send(t) },
            resetAuth: function() { localStorage.removeItem("TH"), localStorage.removeItem("HT") },
            auth: function(t) { this.loading.active = !0, null == cc.RedT._socket || 1 != cc.RedT._socket.readyState ? setTimeout(function() { cc.RedT.send(t) }, 300) : cc.RedT.send(t) },
            unAuthorized: function(t) { this.loading.active = !1, cc.RedT.inGame.resetAuth(), void 0 !== t.message ? this.notice.show({ title: "\u0110\u0102NG K\xdd", text: "C\xf3 l\u1ed7i s\u1ea3y ra, xin vui l\xf2ng th\u1eed l\u1ea1i..." }) : this.notice.show(t) },
            Authorized: function(t) { this.loading.active = !1, t ? this.signIn() : this.dialog.showSignName() },
            onData: function(t) { this.dataOn && (void 0 !== t.unauth && this.unAuthorized(t.unauth), void 0 !== t.Authorized && this.Authorized(t.Authorized), void 0 !== t.user && (cc.RedT.userData(t.user), this.dataUser(t.user)), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (this.TopHu.onData(t.TopHu), this.dialog.DEvent.onHU(t.TopHu)), void 0 !== t.taixiu && (cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.taixiu.taixiu && t.taixiu.taixiu), void 0 !== t.shop && this.dialog.shop.onData(t.shop), void 0 !== t.profile && (this.dialog.profile.onData(t.profile), void 0 !== t.profile.level && this.dialog.VipPoint.level(t.profile.level)), void 0 !== t.history && this.dialog.profile.onData(t), void 0 !== t.notice && this.notice.show(t.notice), void 0 !== t.news && this.newsOn && this.newsContents.onData(t.news), void 0 !== t.captcha && this.captcha(t.captcha), void 0 !== t.pushnohu && this.ThongBaoNoHu.onData(t.pushnohu), void 0 !== t.loading && this.bgLoading.onData(t.loading), void 0 !== t.event && this.dialog && this.dialog.DEvent.onData(t.event), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp), t.toGame && this.MenuRoom.onData(t.toGame), t.message && this.dialog.iMessage.onData(t.message)) },
            captcha: function(t) {
                switch (t.name) {
                    case "signUp":
                        this.dialog.signUp.initCaptcha(t.data);
                        break;
                    case "signIn":
                        this.dialog.signIn.initCaptcha(t.data);
                        break;
                    case "giftcode":
                        this.dialog.GiftCode.initCaptcha(t.data);
                        break;
                    case "forgotpass":
                        this.dialog.ForGotPass.initCaptcha(t.data);
                        break;
                    case "signname":
                        this.dialog.signName.initCaptcha(t.data);
                        break;
                    case "chargeCard":
                        this.dialog.shop.NapRed.NapThe.initCaptcha(t.data);
                        break;
                    case "regOTP":
                        this.dialog.profile.BaoMat.DangKyOTP.initCaptcha(t.data)
                }
            },
            setAvatar: function(t) { t >>= 0, void 0 !== cc.RedT.avatars[t] ? (this.header.avatar.spriteFrame = cc.RedT.avatars[t], this.dialog.profile.CaNhan.avatar.spriteFrame = cc.RedT.avatars[t]) : (this.header.avatar.spriteFrame = cc.RedT.avatars[0], this.dialog.profile.CaNhan.avatar.spriteFrame = cc.RedT.avatars[0]) },
            dataUser: function(t) { t.avatar, void 0 !== t.name && (this.header.userName.string = t.name, this.dialog.profile.CaNhan.username.string = t.name), void 0 !== t.username && (this.dialog.profile.CaNhan.login_name.string = t.username), void 0 !== t.red && (this.header.userRed.string = this.dialog.profile.KetSat.redHT.string = this.dialog.profile.CaNhan.red.string = n.numberWithCommas(t.red)), void 0 !== t.ketSat && (this.dialog.profile.KetSat.redKet.string = this.dialog.profile.CaNhan.redKet.string = n.numberWithCommas(t.ketSat)), void 0 !== t.ref_name && (this.dialog.profile.CaNhan.ref_name.string = t.ref_name), void 0 !== t.phone && (this.dialog.profile.CaNhan.phone.string = t.phone, this.dialog.profile.BaoMat.DangKyOTP.statusOTP(!n.isEmpty(t.phone)), n.isEmpty(t.phone) ? (this.dialog.profile.CaNhan.phoneActive.active = !1, this.header.activePhone(!0)) : (this.dialog.profile.BaoMat.DangKyOTP.labelPhone.string = t.phone, cc.RedT.user.veryphone ? (this.dialog.profile.CaNhan.phoneStatus.string = "\u0110\xe3 X\xe1c Th\u1ef1c", this.dialog.profile.CaNhan.phoneActive.active = !0, this.dialog.profile.CaNhan.phoneStatus.node.color = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX("06B30D"), this.header.activePhone(!1)) : (this.dialog.profile.CaNhan.phoneStatus.string = "Ch\u01b0a X\xe1c Th\u1ef1c", this.dialog.profile.CaNhan.phoneActive.active = !1, this.dialog.profile.CaNhan.phoneStatus.node.color = this.dialog.profile.CaNhan.phoneStatus.node.color.fromHEX("FF0000"), this.header.activePhone(!1)))), void 0 !== t.joinedOn && (this.dialog.profile.CaNhan.joinedOn.string = n.getStringDateByTime(t.joinedOn)), void 0 !== t.level && (this.header.level(t.level), this.header.updateEXP(t.vipHT, t.vipNext)) },
            signOut: function() { cc.RedT.user = {}, cc.RedT.IS_LOGIN = !1, this.AllReset() },
            signIn: function() { cc.RedT.IS_LOGIN = !0, this.header.isSignIn(), this.dialog.onBack(), cc.RedT.MiniPanel.signIn() },
            AllReset: function() { this.loading.active = !1, this.newsContents.reset(), this.header.isSignOut(), this.dialog.onCloseDialog(), this.MenuRoom.onBack(), cc.RedT.MiniPanel.newGame(), this.dialog.iMessage.reset() },
            noticeCopy: function() {
                var t = cc.instantiate(cc.RedT.MiniPanel.prefabMiniNotice);
                t.getComponent("mini_warning").text.string = "\u0110\xe3 copy n\u1ed9i dung \u0111\u01b0\u1ee3c ch\u1ecdn", this.node.addChild(t)
            },
            audioClick: function() { cc.RedT.audio.playClick() },
            audioUnClick: function() { cc.RedT.audio.playUnClick() },
            fanpage: function() { cc.sys.openURL("https://t.me/code_86") },
            group: function() { cc.sys.openURL("https://t.me/code_86") },
            ios: function() { cc.sys.openURL("https://t.me/code_86") },
            android: function() { cc.sys.openURL("https://t.me/code_86") },
            telegram: function() { cc.sys.openURL("https://t.me/code_86") },
            support: function() { cc.sys.openURL("https://t.me/code_86") },
            onGetHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    Promise.all(cc.RedT.setting.topHu.data.vq_red.filter(function(t) { return 1 == t.red })).then(function(e) {
                        var i = e.filter(function(t) { return 100 == t.type }),
                            o = e.filter(function(t) { return 1e3 == t.type }),
                            c = e.filter(function(t) { return 1e4 == t.type }),
                            s = n.getOnlyNumberInString(t.iconVQRed.hu100.string),
                            a = n.getOnlyNumberInString(t.iconVQRed.hu1k.string),
                            h = n.getOnlyNumberInString(t.iconVQRed.hu10k.string);
                        s - i[0].bet != 0 && n.numberTo(t.iconVQRed.hu100, n.getOnlyNumberInString(t.iconVQRed.hu100.string), i[0].bet, 4900, !0), a - o[0].bet != 0 && n.numberTo(t.iconVQRed.hu1k, n.getOnlyNumberInString(t.iconVQRed.hu1k.string), o[0].bet, 4900, !0), h - c[0].bet != 0 && n.numberTo(t.iconVQRed.hu10k, n.getOnlyNumberInString(t.iconVQRed.hu10k.string), c[0].bet, 4900, !0)
                    }), Promise.all(cc.RedT.setting.topHu.data.candy.filter(function(t) { return 1 == t.red })).then(function(e) {
                        var i = e.filter(function(t) { return 100 == t.type }),
                            o = e.filter(function(t) { return 1e3 == t.type }),
                            c = e.filter(function(t) { return 1e4 == t.type }),
                            s = n.getOnlyNumberInString(t.iconCandy.hu100.string),
                            a = n.getOnlyNumberInString(t.iconCandy.hu1k.string),
                            h = n.getOnlyNumberInString(t.iconCandy.hu10k.string);
                        s - i[0].bet != 0 && n.numberTo(t.iconCandy.hu100, n.getOnlyNumberInString(t.iconCandy.hu100.string), i[0].bet, 4900, !0), a - o[0].bet != 0 && n.numberTo(t.iconCandy.hu1k, n.getOnlyNumberInString(t.iconCandy.hu1k.string), o[0].bet, 4900, !0), h - c[0].bet != 0 && n.numberTo(t.iconCandy.hu10k, n.getOnlyNumberInString(t.iconCandy.hu10k.string), c[0].bet, 4900, !0)
                    }), Promise.all(cc.RedT.setting.topHu.data.zeus.filter(function(t) { return 1 == t.red })).then(function(e) {
                        var i = e.filter(function(t) { return 100 == t.type }),
                            o = e.filter(function(t) { return 1e3 == t.type }),
                            c = e.filter(function(t) { return 1e4 == t.type }),
                            s = n.getOnlyNumberInString(t.iconZeus.hu100.string),
                            a = n.getOnlyNumberInString(t.iconZeus.hu1k.string),
                            h = n.getOnlyNumberInString(t.iconZeus.hu10k.string);
                        s - i[0].bet != 0 && n.numberTo(t.iconZeus.hu100, n.getOnlyNumberInString(t.iconZeus.hu100.string), i[0].bet, 4900, !0), a - o[0].bet != 0 && n.numberTo(t.iconZeus.hu1k, n.getOnlyNumberInString(t.iconZeus.hu1k.string), o[0].bet, 4900, !0), h - c[0].bet != 0 && n.numberTo(t.iconZeus.hu10k, n.getOnlyNumberInString(t.iconZeus.hu10k.string), c[0].bet, 4900, !0)
                    }), Promise.all(cc.RedT.setting.topHu.data.long.filter(function(t) { return 1 == t.red })).then(function(e) {
                        var i = e.filter(function(t) { return 100 == t.type }),
                            o = e.filter(function(t) { return 1e3 == t.type }),
                            c = e.filter(function(t) { return 1e4 == t.type }),
                            s = n.getOnlyNumberInString(t.iconLongLan.hu100.string),
                            a = n.getOnlyNumberInString(t.iconLongLan.hu1k.string),
                            h = n.getOnlyNumberInString(t.iconLongLan.hu10k.string);
                        s - i[0].bet != 0 && n.numberTo(t.iconLongLan.hu100, n.getOnlyNumberInString(t.iconLongLan.hu100.string), i[0].bet, 4900, !0), a - o[0].bet != 0 && n.numberTo(t.iconLongLan.hu1k, n.getOnlyNumberInString(t.iconLongLan.hu1k.string), o[0].bet, 4900, !0), h - c[0].bet != 0 && n.numberTo(t.iconLongLan.hu10k, n.getOnlyNumberInString(t.iconLongLan.hu10k.string), c[0].bet, 4900, !0)
                    })
                }
            }
        }), cc._RF.pop()
    }, { "./Util/Http": "Http", BaseControll: "BaseControll", Dialog: "Dialog", Header: "Header", Helper: "Helper", MenuRoom: "MenuRoom", NewsContents: "NewsContents", Notice: "Notice", PushNohu: "PushNohu", bgLoading: "bgLoading" }],
    MegaJ_history_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cc1fbcAjLFCzL2OcJdQHlRw", "MegaJ_history_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, game: cc.Label, kq: cc.Label, thuong: cc.Label } }), cc._RF.pop()
    }, {}],
    MegaJ_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "194c9e0ilRN5ZlVuR1vy/q3", "MegaJ_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, header: cc.Node, body: cc.Node, quay: cc.Node, nhanve: cc.Node, select: "" },
            init: function(t) { this.RedT = t },
            onLoad: function() { this.page = cc.instantiate(this.page), this.page.y = -238, this.node.addChild(this.page), this.page = this.page.getComponent("Pagination"), this.quay = this.quay.children.map(function(t) { return t.getComponent("MegaJ_history_item") }), this.nhanve = this.nhanve.children.map(function(t) { return t.getComponent("MegaJ_top_item") }), this.header = this.header.children.map(function(t) { return t.getComponent("itemContentMenu") }), this.page.init(this) },
            headSelect: function(t) { this.select = t.target.name, this.header.forEach(function(t) { t.node.name === this.select ? t.select() : t.unselect() }.bind(this)), this.body.children.forEach(function(t) { t.name === this.select ? t.active = !0 : t.active = !1 }.bind(this)), this.get_data() },
            onEnable: function() { this.get_data() },
            get_data: function(t) {
                if (void 0 === t && (t = 1), !this.RedT.isSpin) {
                    var e = {};
                    e[this.select] = t, cc.RedT.send({ g: { megaj: { history: e } } })
                }
            },
            onData: function(t) { t.quay && this.quayData(t.quay), t.nhanve && this.nhanveData(t.nhanve) },
            quayData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.quay.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.game.string = 100 === o.room ? "Thanh \u0111\u1ed3ng" : 100 === o.room ? "B\u1ea1ch kim" : "Ho\xe0ng kim", e.kq.string = 5 === o.kq ? "Th\xeam l\u01b0\u1ee3t" : 7 === o.kq ? "50%" : n.numberWithCommas(o.win), e.thuong.string = n.numberWithCommas(o.win)) : e.node.active = !1
                }.bind(this))
            },
            nhanveData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.nhanve.forEach(function(e, i) {
                    var o = t.data[i];
                    if (void 0 !== o) {
                        e.node.active = !0, e.bg.active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.game.string = this.nameGame(o.to), e.room.string = 100 === o.room ? "Thanh \u0111\u1ed3ng" : 100 === o.room ? "B\u1ea1ch kim" : "Ho\xe0ng kim", e.sl.string = o.sl, e.status.string = o.status ? "\u0110\xe3 nh\u1eadn" : "Ch\u01b0a nh\u1eadn";
                        var c = e.status.node;
                        o.status ? c.color = c.color.fromHEX("#248A0A") : c.color = c.color.fromHEX("#BB0B0B")
                    } else e.node.active = !1
                }.bind(this))
            },
            nameGame: function(t) {
                switch (t) {
                    case 100:
                        return "PUBG";
                    case 101:
                        return "Candy";
                    case 102:
                        return "Panda";
                    case 103:
                        return "\u0110\u1eadp H\u0169";
                    case 104:
                        return "Mini 3C\xe2y";
                    case 105:
                        return "Ng\u1ed9 Kh\xf4ng";
                    case 106:
                        return "Mini Poker"
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    MegaJ_top_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3b8a4fxQdpHfbWILbYJDY0a", "MegaJ_top_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, game: cc.Label, room: cc.Label, sl: cc.Label, status: cc.Label } }), cc._RF.pop()
    }, {}],
    MegaJ_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d12d5B1O+1B0Lp+cj0QY7BT", "MegaJ_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node },
            init: function(t) { this.RedT = t },
            onLoad: function() {
                var t = this;
                this.page = cc.instantiate(this.page), this.page.y = -245, this.node.addChild(this.page), this.page = this.page.getComponent("Pagination"), Promise.all(this.content.children.map(function(t) { return t.getComponent("MegaJ_history_item") })).then(function(e) { t.content = e }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), this.RedT.isSpin || cc.RedT.send({ g: { megaj: { top: t } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.game.string = o.name, e.kq.string = 100 === o.room ? "Thanh \u0111\u1ed3ng" : 100 === o.room ? "B\u1ea1ch kim" : "Ho\xe0ng kim", e.thuong.string = n.numberWithCommas(o.win)) : e.node.active = !1
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    MegaJackpot: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4a89726nBRKG4Pdyq0ZfjR6", "MegaJackpot");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { background: sp.Skeleton, bg_move: cc.Node, menuGame: cc.Node, bgVQ: cc.Node, imgVQ: cc.Sprite, vqthanhdong: cc.SpriteFrame, vqbachkim: cc.SpriteFrame, vqhoangkim: cc.SpriteFrame, hu: cc.Label, luot: cc.Label, notice: cc.Node, spinNode: cc.Node, spinSprite: cc.Sprite, spinOn: cc.SpriteFrame, spinOff: cc.SpriteFrame, isSpin: !1 },
            init: function(t) { this.RedT = t, cc.RedT.setting.MegaJackpot = cc.RedT.setting.MegaJackpot || { scale: 1, users: { 100: 0, 1000: 0, 10000: 0 } }, this.game = 100, this.bgAnim = { 100: "thanhdong", 1000: "bachkim", 10000: "hoangkim" }, "true" == localStorage.getItem("MegaJackpot") && (this.node.active = !0), void 0 !== cc.RedT.setting.MegaJackpot.game ? cc.RedT.setting.MegaJackpot.game !== this.game && this.changerGame(null, cc.RedT.setting.MegaJackpot.game) : cc.RedT.setting.MegaJackpot.game = this.game = "100", void 0 !== cc.RedT.setting.MegaJackpot.position && (this.node.position = cc.RedT.setting.MegaJackpot.position) },
            onLoad: function() { this.RedT.Dialog.MegaJ_history.init(this), this.RedT.Dialog.MegaJ_top.init(this) },
            onEnable: function() { this.onGetHu(), this.regUpdate(), this.bg_move.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.bg_move.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.bg_move.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.bg_move.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.bg_move.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.bg_move.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.bg_move.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.bg_move.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.bg_move.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.bg_move.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.MegaJackpot.position = this.node.position },
            setTop: function() { cc.RedT.setting.MegaJackpot.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            changerGame: function(t, e) { cc.RedT.setting.MegaJackpot.game = this.game = e, this.bgAnim[e] && (this.background.setAnimation(0, this.bgAnim[e], !0), this.imgVQ.spriteFrame = this["vq" + this.bgAnim[e]]), this.luot.string = cc.RedT.setting.MegaJackpot.users[e] + " L\u01b0\u1ee3t", this.menuGame.children.forEach(function(t) { t.name === e ? (t.pauseSystemEvents(), t.children[0].active = !1, t.children[1].active = !0) : (t.resumeSystemEvents(), t.children[0].active = !0, t.children[1].active = !1) }), this.onGetHu() },
            openGame: function(t) { void 0 === t && (t = null), cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("MegaJackpot", !0), this.setTop(), t && this.changerGame(null, t)) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { this.node.active = !1, localStorage.setItem("MegaJackpot", !1) },
            spin: function() { this.spinNode.pauseSystemEvents(), this.spinSprite.spriteFrame = this.spinOff, this.isSpin || cc.RedT.send({ g: { megaj: { spin: this.game } } }) },
            onData: function(t) { t.status && this.updateStatus(t.status), t.notice && this.addNotice(t.notice), t.info && this.info(t.info), t.history && this.RedT.Dialog.MegaJ_history.onData(t.history), t.top && this.RedT.Dialog.MegaJ_top.onData(t.top) },
            info: function(t) { cc.RedT.setting.MegaJackpot.users[100] = t[100], cc.RedT.setting.MegaJackpot.users[1e3] = t[1e3], cc.RedT.setting.MegaJackpot.users[1e4] = t[1e4], this.luot.string = t[this.game] + " L\u01b0\u1ee3t" },
            updateStatus: function(t) {
                if (!0 === t.status) {
                    this.isSpin = !0, this.oldData = t;
                    var e = cc.rotateTo(10, -(2520 + t.data.position)).easing(cc.easeQuinticActionOut()),
                        i = cc.rotateTo(10, -(2520 + t.data.position)).easing(cc.easeQuinticActionOut()),
                        n = cc.callFunc(function() { this.bgVQ.angle = -this.oldData.data.position, this.imgVQ.node.angle = -this.oldData.data.position, this.isSpin = !1, this.spinNode.resumeSystemEvents(), this.spinSprite.spriteFrame = this.spinOn, this.bgVQ.stopAllActions(), this.imgVQ.node.stopAllActions(), this.updateKQ() }, this);
                    this.bgVQ.runAction(e), this.imgVQ.node.runAction(cc.sequence(i, n))
                } else this.isSpin = !1, this.spinNode.resumeSystemEvents(), this.spinSprite.spriteFrame = this.spinOn
            },
            updateKQ: function() {
                if (5 === this.oldData.kq);
                else if (12 === this.oldData.kq);
                else {
                    var t = new cc.Node;
                    t.addComponent(cc.Label), (t = t.getComponent(cc.Label)).string = n.numberWithCommas(this.oldData.data.thuong), t.font = cc.RedT.util.fontCong, t.lineHeight = 130, t.fontSize = 20, t.node.position = cc.v2(0, 30), this.notice.addChild(t.node), t.node.runAction(cc.sequence(cc.moveTo(2.5, cc.v2(0, 150)), cc.callFunc(function() { t.node.destroy() }, this)))
                }
            },
            regUpdate: function() { cc.RedT.send({ g: { megaj: { update: !0 } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.RedT.prefabMiniNotice);
                e.getComponent("mini_warning").text.string = t, this.notice.addChild(e)
            },
            onGetHu: function() {
                if (void 0 !== cc.RedT.setting.topHu.data && this.node.active) {
                    var t = this,
                        e = cc.RedT.setting.topHu.data.megaj.filter(function(e) { return e.type == t.game }),
                        i = n.getOnlyNumberInString(this.hu.string),
                        o = e[0].bet;
                    i - o != 0 && n.numberTo(this.hu, i, o, 2e3, !0)
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    MenuRoom: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b4e69eoVuxHQo0om02/ZxFC", "MenuRoom"), cc.Class({
            extends: cc.Component,
            properties: { background: cc.Sprite, hall: { default: [], type: cc.SpriteFrame }, rooms: { default: [], type: cc.Sprite }, table1: { default: [], type: cc.SpriteFrame }, table2: { default: [], type: cc.SpriteFrame }, title: cc.Label, pokerTitle: cc.Node },
            onBack: function() { this.node.active = !1 },
            openGame: function(t) {
                switch (this.game = t, this.game.game) {
                    case "poker":
                        this.background.spriteFrame = this.hall[0], this.pokerTitle.active = !0;
                        break;
                    case "3cay":
                        this.background.spriteFrame = this.hall[1], this.pokerTitle.active = !1
                }
                this.changerRoom(), this.title.string = t.title, this.node.active = !0
            },
            changerRoom: function() { this.game.table2 ? this.rooms.forEach(function(t, e) { t.spriteFrame = e < 4 ? this.table2[3] : e < 8 ? this.table2[4] : this.table2[5] }.bind(this)) : this.rooms.forEach(function(t, e) { t.spriteFrame = e < 4 ? this.table1[3] : e < 8 ? this.table1[4] : this.table1[5] }.bind(this)) },
            onClickRoom: function(t) {
                switch (this.bet = t.target.name, cc.RedT.audio.playClick(), this.game.game) {
                    case "poker":
                        cc.RedT.inGame.dialog.showPokerNap(this);
                        break;
                    case "3cay":
                        cc.RedT.inGame.loading.active = !0, cc.RedT.send({ g: { bacay: { reg: this.bet } } })
                }
            },
            onData: function(t) { cc.RedT.MiniPanel.node.parent = null, cc.director.loadScene(t) }
        }), cc._RF.pop()
    }, {}],
    Menu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1763c2/MDpCQ4oC+FaHXfWh", "Menu"), cc.Class({
            extends: cc.Component,
            properties: { header: cc.Node, games: cc.Node, adsContent: cc.PageView, adsTimeNext: 0, tabGameArr: { default: [], type: cc.Node } },
            onLoad: function() {
                var t = this;
                Promise.all(this.games.children.map(function(t) { return t.getComponent("iconGame") })).then(function(e) { null != e && (t.games = e) })
            },
            onEnable: function() {},
            onDisable: function() {},
            nextAds: function() { this.adsContent._curPageIdx == this.adsContent._pages.length - 1 ? this.adsContent.scrollToPage(0, 1.5) : this.adsContent.scrollToPage(this.adsContent._curPageIdx + 1, .85), this.setTimeAds() },
            eventStart: function() { clearTimeout(this.adsTime) },
            setTimeAds: function() { this.eventStart(), this.adsTime = setTimeout(function() { this.nextAds() }.bind(this), 1e3 * this.adsTimeNext) },
            onHeadSelect: function(t) { Promise.all(this.header.children.map(function(e) { e == t.target ? (e.children[0].active = !1, e.children[1].active = !0, e.pauseSystemEvents()) : (e.children[0].active = !0, e.children[1].active = !1, e.resumeSystemEvents()) })), Promise.all(this.games.map(function(e) { null != e && ("all" == t.target.name || e[t.target.name.replace(/ /g, "")] ? e.node.active = !0 : e.node.active = !1) })) },
            onBtnChoseTabGame: function(t, e) {
                for (var i = 0; i < this.tabGameArr.length; i++) this.tabGameArr[i].active = !1;
                this.tabGameArr[e].active = !0
            },
            onWait: function() { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? cc.RedT.inGame.notice.show({ title: "B\u1ea2O TR\xcc", text: "Game \u0111ang b\u1ea3o tr\xec..." }) : cc.RedT.inGame.dialog.showSignIn() },
            openMiniGame: function(t, e) { cc.RedT.MiniPanel[e].openGame() },
            openMegaJ: function(t, e) { cc.RedT.MiniPanel.MegaJackpot.openGame(e) },
            regGame: function(t, e) { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (cc.RedT.inGame.loading.active = !0, cc.RedT.send({ g: { reg: e } })) : cc.RedT.inGame.dialog.showSignIn() },
            openGame: function(t, e) { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (cc.RedT.MiniPanel.node.parent = null, cc.RedT.inGame.dataOn = !1, cc.RedT.inGame.loading.active = !0, cc.director.loadScene(e)) : cc.RedT.inGame.dialog.showSignIn() },
            openTXCL: function(t, e) { cc.RedT.MiniPanel.TaiXiu.openGame(null, e) }
        }), cc._RF.pop()
    }, {}],
    Message: [function(t, e, i) {
        "use strict";
        var n;

        function o(t, e, i) { return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = i, t }
        cc._RF.push(e, "e0268JjkIdLKJIvm3DyUhb2", "Message");
        var c = (o(n = { TITLE_SUCCESS: "Th\xe0nh c\xf4ng", TITLE_FAILED: "L\u1ed7i", TIME_OUT_LOADING: "C\xf3 l\u1ed7i trong qu\xe1 tr\xecnh th\u1ef1c hi\u1ec7n, vui l\xf2ng th\u1eed l\u1ea1i", CONNECT_SFS_ERROR: "Kh\xf4ng th\u1ec3 k\u1ebft n\u1ed1i t\u1edbi Server", MISSING_INFO: "Vui l\xf2ng nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 c\xe1c th\xf4ng tin", SUCCESS: "Th\xe0nh c\xf4ng", FAILURE: "Th\u1ea5t b\u1ea1i", VERSION: "Phi\xean b\u1ea3n: {0}", CONTACT: "{0}", OTP_FIRST_ACCOUNT: "K\xedch ho\u1ea1t s\u1ed1 \u0111i\u1ec7n tho\u1ea1i b\u1ea3o m\u1eadt \u0111\u1ec3 b\u1ea3o v\u1ec7 t\xe0i kho\u1ea3n b\u1ea1n nh\xe9!", OTP_ACTIVE_ACCOUNT: "Vui l\xf2ng so\u1ea1n tin <color=yellow>{0}</color> g\u1eedi <color=yellow>{1}</color> \u0111\u1ec3 k\xedch ho\u1ea1t OTP", OTP_FORGET_PASSWORD: "B\u01b0\u1edbc 1: So\u1ea1n tin <color=yellow>{0}</color> g\u1eedi <color=yellow>{1}</color> \u0111\u1ec3 l\u1ea5y m\xe3 x\xe1c th\u1ef1c", LOGIN_TITLE: "\u0110\u0103ng nh\u1eadp", LOGIN_MISSING_USERNAME: "Thi\u1ebfu th\xf4ng tin t\xe0i kho\u1ea3n", LOGIN_MISSING_PASSWORD: "Thi\u1ebfu th\xf4ng tin m\u1eadt kh\u1ea9u", LOGIN_MISSING_CAPTCHA: "Thi\u1ebfu th\xf4ng tin m\xe3 x\xe1c nh\u1eadn", LOGIN_SECURITY_SMS: "\u0110\u1ec3 \u0111\u0103ng k\xfd b\u1ea3o m\u1eadt \u0111\u0103ng nh\u1eadp vui l\xf2ng so\u1ea1n tin <color=yellow>{0}</color> g\u1eedi <color=yellow>{1}</color>\n\u0110\u1ec3 h\u1ee7y b\u1ea3o m\u1eadt \u0111\u0103ng nh\u1eadp vui l\xf2ng so\u1ea1n tin <color=yellow>{2}</color> g\u1eedi <color=yellow>{3}</color>", LOGIN_SECURITY_SMS_2: "So\u1ea1n tin <color=yellow>{0}</color> g\u1eedi <color=yellow>{1}</color> \u0111\u1ec3 l\u1ea5y m\xe3 OTP", SECURITY_GAME: "Qu\u1ea3n l\xfd game", TIME_LOGIN: "B\u1ea1n \u0111\xe3 \u0111\u0103ng nh\u1eadp qu\xe1 nhi\u1ec1u\nVui l\xf2ng th\u1eed l\u1ea1i sau \xedt ph\xfat", REGISTER_TITLE: "\u0110\u0103ng k\xfd", REGISTER_MISSING_USERNAME: "Vui l\xf2ng nh\u1eadp t\xean t\xe0i kho\u1ea3n", REGISTER_MISSING_PASSWORD: "Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u", REGISTER_MISSING_REPASSWORD: "Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u x\xe1c nh\u1eadn", REGISTER_REPASSWORD_NOT_CORRECT: "Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u ch\u01b0a ch\xednh x\xe1c. Vui l\xf2ng th\u1eed l\u1ea1i", REGISTER_NOT_AGREE_TERM: "Vui l\xf2ng x\xe1c nh\u1eadn l\u1ea1i c\xe1c \u0111i\u1ec1u kho\u1ea3n s\u1eed d\u1ee5ng", FORGET_PASSWORD_TITLE: "Qu\xean m\u1eadt kh\u1ea9u", FORGET_PASSWORD_MISSING_USERNAME_EMAIL: "Vui l\xf2ng nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 t\xean t\xe0i kho\u1ea3n v\xe0 Email", FORGET_PASSWORD_NOT_SUPPORT_FORGET_PASSWORD_BY_PHONE: "Ch\xfang t\xf4i hi\u1ec7n ch\u01b0a h\u1ed7 tr\u1ee3 l\u1ea5y l\u1ea1i m\u1eadt kh\u1ea9u b\u1eb1ng s\u1ed1 \u0111i\u1ec7n tho\u1ea1i", FORGET_PASSWORD_SUCCESS: "G\u1eedi email th\xe0nh c\xf4ng. Vui l\xf2ng ki\u1ec3m tra email \u0111\u1ec3 l\u1ea5y th\xf4ng tin v\u1ec1 m\u1eadt kh\u1ea9u m\u1edbi", FORGET_PASSWORD_RE_PASSWORD_NOT_CORRECT: "M\u1eadt kh\u1ea9u x\xe1c nh\u1eadn kh\xf4ng ch\xednh x\xe1c", CHANGE_PASSWORD_TITLE: "\u0110\u1ed5i m\u1eadt kh\u1ea9u", CHANGE_PASSWORD_RE_PASSWORD_NOT_CORRECT: "M\u1eadt kh\u1ea9u x\xe1c nh\u1eadn kh\xf4ng ch\xednh x\xe1c", CHANGE_PASSWORD_GET_OTP: "B\u1ea1n vui l\xf2ng s\u1eed d\u1ee5ng OTP App \u0111\u1ec3 nh\u1eadn OTP ho\u1eb7c li\xean h\u1ec7 v\u1edbi QTV \u0111\u1ec3 bi\u1ebft th\xeam th\xf4ng tin", SET_NICKNAME_TITLE: "T\u1ea1o nh\xe2n v\u1eadt", SET_NICKNAME_NICKNAME_NOT_EMPTY: "T\xean nh\u1eadn v\u1eadt kh\xf4ng \u0111\u01b0\u1ee3c tr\u1ed1ng", OTP_NOT_EMPTY: "M\xe3 OTP kh\xf4ng \u0111\u01b0\u1ee3c ph\xe9p tr\u1ed1ng", NICKNAME_DIFFERENT_USERNAME: "T\xean nh\xe2n v\u1eadt kh\xf4ng \u0111\u01b0\u1ee3c tr\xf9ng v\u1edbi t\xe0i kho\u1ea3n", OTP_LOGIN_TITLE: "B\u1ea3o m\u1eadt \u0111\u0103ng nh\u1eadp", REGISTER_GIFTCODE_WELCOME: "Xin ch\xe0o <color=yellow>{0}</color>", UPDATE_DIAMOND: "B\u1ea1n \u0111\u01b0\u1ee3c t\u1eb7ng KIM C\u01af\u01a0NG. Xem ngay t\u1ea1i S\u1ef0 KI\u1ec6N L\xcaN \u0110\u1edcI SI\xcaU XE", LOGOUT_TITLE: "\u0110\u0103ng xu\u1ea5t", UPDATE_INFO: "C\u1eadp nh\u1eadt th\xf4ng tin c\xe1 nh\xe2n", UPDATE_AVATAR_TITLE: "\u0110\u1ed5i avatar", UPDATE_PASSWORD_TITLE: "\u0110\u1ed5i m\u1eadt kh\u1ea9u", FORMAT_PHONE_NOT_CORRECT: "\u0110\u1ecbnh d\u1ea1ng s\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng ch\xednh x\xe1c", FORMAT_DOB_NOT_CORRECT: "\u0110\u1ecbnh d\u1ea1ng ng\xe0y sinh kh\xf4ng ch\xednh x\xe1c", FORMAT_EMAIL_NOT_CORRECT: "\u0110\u1ecbnh d\u1ea1ng Email kh\xf4ng ch\xednh x\xe1c", INFO_DOB: "{0}/{1}/{2}", PLAYER_INFO_TITLE: "Th\xf4ng tin ng\u01b0\u1eddi ch\u01a1i", MAIL_TITLE: "H\xf2m th\u01b0", MAIL_DETAIL_TITLE: "Ngu\u1eddi g\u1eedi: {0} - Th\u1eddi gian: {1}", MAIL_NOTIFICATION: "B\u1ea1n c\xf3 tin nh\u1eafn m\u1edbi", RECHARGE_MONEY_SUCCESS: "B\u1ea1n \u0111\xe3 n\u1ea1p th\xe0nh c\xf4ng {0} {1}", RECHARGE_MONEY_TITLE: "N\u1ea1p th\u1ebb", RECHARGE_MONEY_HISTORY_NAME: "N\u1ea1p th\u1ebb {0}", RECHARGE_MONEY_HISTORY_NOTE: "Code: {0} - Seri: {1}", NUMBER_MONEY_LARGER_ZERO: "S\u1ed1 KAY ph\u1ea3i > 0", RECHARGE_GOLD_SUCCESS: "\u0110\u1ed5i th\xe0nh c\xf4ng", RECHARGE_GOLD_TITLE: "\u0110\u1ed5i Xu", RECHARGE_GOLD_HISTORY_NAME: "\u0110\u1ed5i Xu", RECHARGE_GOLD_HISTORY_NOTE: "S\u1ed1 Xu nh\u1eadn \u0111\u01b0\u1ee3c: {0}", RECHARGE_SMS_NOTE: "<color=#A17E1A><i>N\u1ea1p {0} nh\u1eadn ngay {1} KAY</i></c>", RECHARGE_SMS_MSG: "So\u1ea1n <color=yellow>{0}</color> g\u1eedi <color=green>{1}</color>", RECHARGE_SMS_TENDANGNHAP: "tendangnhap", RECHARGE_SMS_HISTORY_NAME: "N\u1ea1p SMS", RECHARGE_BANKING_TITLE: "N\u1ea1p Banking", AWARD_TITLE: "\u0110\u1ed5i th\u01b0\u1edfng", AWARD_DESCRIBE: "\u0110\u1ed5i th\u1ebb {0}", NUMBER_CARDS_LARGER_ZERO: "S\u1ed1 l\u01b0\u1ee3ng th\u1ebb ph\u1ea3i > 0", TRANSFER_TITLE: "Chuy\u1ec3n kho\u1ea3n", VALUE_LARGER_ZERO: "S\u1ed1 KAY ph\u1ea3i > 0", RE_NICKNAME_NOT_CORRECT: "X\xe1c nh\u1eadn nickname kh\xf4ng ch\xednh x\xe1c", TRANSFER_LOCKED: "Ch\u1ee9c n\u0103ng chuy\u1ec3n kho\u1ea3n \u0111ang t\u1ea1m kh\xf3a", TRANSFER_OTP: "So\u1ea1n tin <color=yellow>{0}</color> g\u1eedi <color=yellow>{1}</color>", SAFE_TITLE: "K\xe9t s\u1eaft", SAFE_NOT_ACTIVE_PHONE: "Vui l\xf2ng b\u1ea3o m\u1eadt t\xe0i kho\u1ea3n b\u1eb1ng S\u1ed1 \u0111i\u1ec7n tho\u1ea1i \u0111\u1ec3 r\xfat ti\u1ec1n", SAFE_GET_OTP: "So\u1ea1n tin: <color = #F0FF40>{0}</color> g\u1eedi <color = #F0FF40>{1}</color> \u0111\u1ec3 l\u1ea5y m\xe3 x\xe1c th\u1ef1c", HISTORY_TITLE: "L\u1ecbch s\u1eed", TOP_TITLE: "B\u1ea3ng x\u1ebfp h\u1ea1ng", GIFTCODE_TITLE: "Gift Code", GIFTCODE_NOT_ACTIVE: "Vui l\xf2ng b\u1ea3o m\u1eadt \u0111\u1ec3 s\u1eed d\u1ee5ng Gift Code", CAPCHA_NOT_CORRECT: "M\xe3 x\xe1c nh\u1eadn kh\xf4ng ch\xednh x\xe1c", CHAT_MESSAGE: "<color=4bcaee><b>{0}: </b></color>{1}", CHAT_VIP_MESSAGE: "<color=4bcaee><b>{0}: </b></color>{1}", CHAT_MESSAGE_FAIL: "<color=red><i>{0}</i></color>", CHAT_GAME_MESSAGE: "<color=fecb6e><b>{0}: </b></color>{1}", CHAT_TAI_XIU_MESSAGE: "<color=04fd4a><b>{0}: </b></color>{1}", CHAT_TAI_XIU_VIP_MESSAGE: "<color=04fd4a><b>{0}: </b></color>{1}", CHAT_SLOT_2_MESSAGE: "<color=#DE9100><b>{0}: </b></color><color=#C3C2C3>{1}</color>", TAIXIU_YOU_ONLE_BET_A_DOOR: "B\u1ea1n ch\u1ec9 \u0111\u01b0\u1ee3c \u0111\u1eb7t m\u1ed9t c\u1eeda", JOIN_ROOM_TITLE: "Ch\u1ecdn ph\xf2ng", NOT_ENOUGH_MONEY_TO_JOIN_GAME: "B\u1ea1n c\u1ea7n t\u1ed1i thi\u1ec3u {0} {1} \u0111\u1ec3 tham gia ch\u01a1i game", NOT_ENOUGH_MONEY_TO_STAY_GAME: "B\u1ea1n c\u1ea7n {0} {1} \u0111\u1ec3 ti\u1ebfp t\u1ee5c ch\u01a1i game!", JOIN_ROOM_ERROR: "Ph\xf2ng ch\u01a1i hi\u1ec7n t\u1ea1i \u0111ang b\u1ecb kh\xf3a", INTIVE_TITLE: "M\u1eddi b\u1ea1n", NOTIFICATION_TITLE: "Th\xf4ng b\xe1o", MONEY: "KAY", GOLD: "XU", VIETTEL: "Vietel", MOBIFONE: "Mobifone", VINAPHONE: "Vinaphone", GATE: "Gate", TOP_UP_ITEM_VALUE: "Th\u1ebb {0}", CHARGE_CARD_ITEM_VALUE: "{0}\u0110", TAI_XIU: "T\xe0i X\u1ec9u", MINI_POKER: "Mini Poker", MINI_BACAY: "Mini Ba C\xe2y", DIAMOND: "Zombies", BAU_CUA: "B\u1ea7u Cua", LUCK_WHEEL: "V\xf2ng Quay May M\u1eafn", TREN_DUOI: "Tr\xean D\u01b0\u1edbi", DIAMOND_2: "Big Babol", SLOT4: "V\u01b0\u01a1ng Qu\u1ed1c KAY", BOM: "Thi\xean H\xe0", INVITE_MESSAGE: "Ng\u01b0\u1eddi ch\u01a1i <color=green>{0}</color> m\u1eddi b\u1ea1n v\xe0o game <color=green>{1}</color>\nM\u1ee9c c\u01b0\u1ee3c: <color=yellow>{2} {3}</color>", GAME_DESCRIBE_TABLE_NAME: "{0} - B\xe0n {1} - Phi\xean ch\u01a1i {2}", GAME_DESCRIBE_TABLE_BET: "M\u1ee9c c\u01b0\u1ee3c: {0} {1}", REQUEST_LEFT_ROOM: "\u0110\u0103ng k\xfd r\u1eddi b\xe0n th\xe0nh c\xf4ng", IGNORE_REQUEST_LEFT_ROOM: "H\u1ee7y r\u1eddi b\xe0n th\xe0nh c\xf4ng", BACAY_WIN_ALL: "B\u1eaeT C\u1ea2 L\xc0NG", BACAY_LOSE_ALL: "PH\xc1T L\u01af\u01a0NG", BACAY_BET_PRIVATE_BUTTON: "\u0110\xc1NH BI\xcaN T\u1ea4T C\u1ea2 ({0})", MAU_BINH_BINH_LUNG_NOT_COMPLETE: "Binh l\u1ee7ng kh\xf4ng th\u1ec3 ho\xe0n th\xe0nh", MAU_BINH_KHONG_HOP_LE: "KH\xd4NG H\u1ee2P L\u1ec6", MAU_BINH_THUNG_PHA_SANH_LON: "TH\xd9NG PH\xc1 S\u1ea2NH \u0110\u1ea0I", MAU_BINH_THUNG_PHA_SANH: "TH\xd9NG PH\xc1 S\u1ea2NH", MAU_BINH_TU_QUY: "T\u1ee8 QU\xdd", MAU_BINH_CU_LU: "C\xd9 L\u0168", MAU_BINH_THUNG: "TH\xd9NG", MAU_BINH_SANH_DAI: "S\u1ea2NH \u0110\u1ea0I", MAU_BINH_SANH_NHI: "S\u1ea2NH NH\u1eca", MAU_BINH_SANH_THUONG: "S\u1ea2NH", MAU_BINH_SAM: "S\xc1M", MAU_BINH_THU: "TH\xda", MAU_BINH_DOI: "\u0110\xd4I", MAU_BINH_MAU_THAU: "M\u1eacU TH\u1ea6U", MAU_BINH_COMPLETED: "HO\xc0N TH\xc0NH", MAU_BINH_RONG_CUON: "R\u1ed2NG CU\u1ed0N", MAU_BINH_SANH_RONG: "S\u1ea2NH R\u1ed2NG", MAU_BINH_MUOI_BA_LA_CUNG_MAU: "\u0110\u1ed2NG HOA", MAU_BINH_NAM_DOI_MOT_SAM: "N\u0102M \u0110\xd4I M\u1ed8T S\xc1M", MAU_BINH_LUC_PHE_BON: "L\u1ee4C PH\xc9 B\xd4N", MAU_BINH_BA_THUNG_TAI_BA_CHI: "BA TH\xd9NG BA CHI", MAU_BINH_BA_SANH_TAI_BA_CHI: "BA S\u1ea2NH BA CHI", MAU_BINH_THUNG_PHA_SANH_CHI_DAU: "TH\xd9NG PH\xc1 S\u1ea2NH CHI \u0110\u1ea6U", MAU_BINH_TU_QUY_CHI_DAU: "T\u1ee8 QU\xdd CHI \u0110\u1ea6U", MAU_BINH_THUNG_PHA_SANH_CHI_GIUA: "TH\xd9NG PH\xc1 S\u1ea2NH CHI GI\u1eeeA", MAU_BINH_TU_QUY_CHI_GIUA: "T\u1ee8 QU\xdd CHI GI\u1eeeA", MAU_BINH_CU_LU_CHI_GIUA: "C\xd9 L\u0168 CHI GI\u1eeeA", MAU_BINH_SAM_CHI_CUOI: "S\xc1M CHI CU\u1ed0I", MAU_BINH_BINH_LUNG: "BINH L\u1ee6NG", MAU_BINH_SAP_BA_CHI: "S\u1eacP BA CHI", MAU_BINH_THANG_BA_CHI: "TH\u1eaeNG BA CHI", MAU_BINH_CHI_TYPE: "{0} . {1}", TLMN_IGNORE_TURN: "B\u1ece L\u01af\u1ee2T", TLMN_BA_DOI_THONG: "BA \u0110\xd4I TH\xd4NG", TLMN_BON_DOI_THONG: "B\u1ed0N \u0110\xd4I TH\xd4NG", TLMN_MOT_TU_QUY: "T\u1ee8 QU\xdd", TLMN_CONG: "C\xd3NG", TLMN_THOI_HAI: "TH\u1ed0I HAI", TLMN_THOI_BA_DOI_THONG: "TH\u1ed0I BA \u0110\xd4I TH\xd4NG", TLMN_THOI_TU_QUY: "TH\u1ed0I T\u1ee8 QU\xdd", TLMN_THOI_BON_DOI_THONG: "TH\u1ed0I B\u1ed0N \u0110\xd4I TH\xd4NG", TLMN_SANH_RONG: "S\u1ea2NH R\u1ed2NG", TLMN_SAU_DOI_THONG: "S\xc1U \u0110\xd4I TH\xd4NG", TLMN_BON_BO_BA: "B\u1ed0N B\u1ed8 BA", TLMN_HAI_BO_TU_QUY: "HAI B\u1ed8 T\u1ee8 QU\xdd", TLMN_MUOI_HAI_CON_DONG_CHAT: "\u0110\u1ed2NG HOA", TLMN_NAM_DOI_THONG: "N\u0102M \u0110\xd4I TH\xd4NG", TLMN_TU_HAI: "T\u1ee8 QU\xdd HAI", TLMN_SAU_DOI: "S\xc1U \u0110\xd4I", TLMN_CHAN_KET_BA_BICH: "CH\u1eb6N K\u1ebeT BA B\xcdCH", TLMN_KET_BA_BICH: "K\u1ebeT BA B\xcdCH", SAM_BAO_MOT: "B\xc1O 1", SAM_THANG_BAO_MOT: "TH\u1eaeNG B\xc1O 1", SAM_THUA_BAO_MOT: "THUA B\xc1O 1", SAM_IGNORE_TURN: "B\u1ece L\u01af\u1ee2T", SAM_XIN_SAM: "XIN S\xc2M", SAM_CONG: "C\xd3NG", SAM_THOI_HAI: "TH\u1ed0I HAI", SAM_THUA_SAM: "THUA S\xc2M", SAM_THANG_SAM: "TH\u1eaeNG S\xc2M", POKER_CHECK: "XEM", POKER_FOLD: "B\u1ece B\xc0I", POKER_ALL_IN: "ALL IN", POKER_RAISE: "T\u1ed0", POKER_CALL: "THEO", POKER_THUNG_PHA_SANH_LON: "TH\xd9NG PH\xc1 S\u1ea2NH \u0110\u1ea0I", POKER_THUNG_PHA_SANH: "TH\xd9NG PH\xc1 S\u1ea2NH", POKER_TU_QUY: "T\u1ee8 QU\xdd", POKER_CU_LU: "C\xd9 L\u0168", POKER_THUNG: "TH\xd9NG", POKER_SANH_DAI: "S\u1ea2NH \u0110\u1ea0I", POKER_SANH_NHI: "S\u1ea2NH NH\u1eca", POKER_SANH_THUONG: "S\u1ea2NH", POKER_SAM: "S\xc1M", POKER_THU: "TH\xda", POKER_DOI: "\u0110\xd4I", POKER_BAI_CAO: "B\xc0I CAO", LIENG_CHECK: "XEM", LIENG_FOLD: "B\u1ece B\xc0I", LIENG_ALL_IN: "ALL IN", LIENG_RAISE: "T\u1ed0", LIENG_CALL: "THEO", LIENG_SAP: "S\xc1P", LIENG_LIENG: "LI\xcaNG", LIENG_BO_DOI: "B\u1ed8 \u0110\u1ed8I", LIENG_BET_TEXT: "{0} ({1})", XOC_DIA_REGISTER_FORM_MESSAGE_HOME: "C\xe1i", XOC_DIA_REGISTER_FORM_MESSAGE_WAITING: "\u0110ang ch\u1edd", XOC_DIA_REGISTER_FORM_MESSAGE_IGNORE: "Ngh\u1ec9 l\xe0m c\xe1i", XOC_DIA_START_REGISTER_HOST: "B\u1eaft \u0111\u1ea7u \u0111\u0103ng k\xfd l\xe0m host", XOC_DIA_WAIT_NEXT_GAME: "Ch\u1edd \u0111\u1ec3 b\u1eaft \u0111\u1ea7u v\xe1n ch\u01a1i m\u1edbi", XOC_DIA_START_BET: "Vui l\xf2ng \u0111\u1eb7t c\u01b0\u1ee3c", XOC_DIA_BUY_SELL_DOOR: "Th\u1eddi gian mua b\xe1n c\u1eeda", XOC_DIA_NOT_TIME_TO_BET: "Kh\xf4ng ph\u1ea3i th\u1eddi gian \u0111\u1ec3 \u0111\u1eb7t c\u1eeda", XOC_DIA_NOT_SELECT_CHIP: "B\u1ea1n ch\u01b0a ch\u1ecdn ti\u1ec1n c\u01b0\u1ee3c", XOC_DIA_BALANCE_DOOR: "C\xe2n c\u1eeda", XOC_DIA_RESULT: "V\xe1n ch\u01a1i k\u1ebft th\xfac", XOC_DIA_NOT_BET_NO_HOST: "Kh\xf4ng th\u1ec3 \u0111\u1eb7t c\u1eeda n\xe0y khi kh\xf4ng c\xf3 C\xe1i", XOC_DIA_HOST_NOT_BET: "C\xe1i kh\xf4ng th\u1ec3 \u0111\u1eb7t", XOC_DIA_ID: "#{0}", PHOM_SELECT_ONE_CARD: "B\u1ea1n ch\u01b0a ch\u1ecdn b\xe0i", PHOM_PLEASE_BOC_BAI: "B\u1ea1n ch\u01b0a b\u1ed1c b\xe0i", PHOM_PLEASE_SELECT_CARDS_HA: "Vui l\xf2ng ch\u1ecdn ph\u1ecfm c\u1ea7n h\u1ea1", PHOM_AN_CHOT: "\u0102N CH\u1ed0T", PHOM_BI_AN_CHOT: "B\u1eca \u0102N CH\u1ed0T", PHOM_U: "\xd9", PHOM_U_KHAN: "\xd9 KHAN", PHOM_U_TRON: "\xd9 TR\xd2N", PHOM_U_DEN: "\xd9 \u0110\u1ec0N", PHOM_DEN: "\u0110\u1ec0N L\xc0NG", PHOM_NHAT: "NH\u1ea4T", PHOM_NHI: "NH\xcc", PHOM_BA: "BA", PHOM_BET: "B\xc9T", PHOM_MOM: "M\xd3M", PHOM_SCORE: "{0} \u0110I\u1ec2M", XITO_CHECK: "XEM", XITO_FOLD: "B\u1ece B\xc0I", XITO_ALL_IN: "ALL IN", XITO_RAISE: "T\u1ed0", XITO_CALL: "THEO", XITO_THUNG_PHA_SANH: "TH\xd9NG PH\xc1 S\u1ea2NH", XITO_TU_QUY: "T\u1ee8 QU\xdd", XITO_CU_LU: "C\xd9 L\u0168", XITO_THUNG: "TH\xd9NG", XITO_SANH: "S\u1ea2NH", XITO_SAM: "S\xc1M", XITO_THU: "TH\xda", XITO_DOI: "\u0110\xd4I", XITO_BAI_CAO: "B\xc0I CAO", SLOT_NOT_CHANGE_BET: "Tr\u1ea1ng th\xe1i hi\u1ec7n t\u1ea1i kh\xf4ng th\u1ec3 thay \u0111\u1ed5i m\u1ee9c c\u01b0\u1ee3c", SLOT_NOT_AUTO_SPIN: "Tr\u1ea1ng th\xe1i hi\u1ec7n t\u1ea1i kh\xf4ng th\u1ec3 t\u1ef1 \u0111\u1ed9ng quay", SLOT_NOT_TEST: "Tr\u1ea1ng th\xe1i hi\u1ec7n t\u1ea1i kh\xf4ng th\u1ec3 ch\u01a1i th\u1eed", SLOT_BONUS_GAME_FINISH: "Ch\xfac m\u1eebng b\u1ea1n nh\u1eadn \u0111\u01b0\u1ee3c <color=yellow>{0} KAY </color>", SLOT_CANCEL_BACK: "Vui l\xf2ng \u0111\u1ee3i v\xf2ng ch\u01a1i k\u1ebft th\xfac", SLOT_NOT_CHANGE_SELECT_LINE: "Tr\u1ea1ng th\xe1i hi\u1ec7n t\u1ea1i kh\xf4ng th\u1ec3 ch\u1ecdn d\xf2ng c\u01b0\u1ee3c", PLAYING_NOT_CHANGE_BET: "Ch\u1edd h\u1ebft l\u01b0\u1ee3t \u0111\u1ec3 \u0111\u1ed5i c\u1eeda \u0111\u1eb7t", PLAYING_NOT_CHANGE_MONEY_TYPE: "Ch\u1edd h\u1ebft l\u01b0\u1ee3t \u0111\u1ec3 \u0111\u1ed5i lo\u1ea1i ti\u1ec1n", AUTO_SPIN_NOT_CHANGE_BET: "\u0110ang t\u1ef1 \u0111\u1ed9ng quay kh\xf4ng \u0111\u01b0\u1ee3c thay \u0111\u1ed5i c\u1eeda \u0111\u1eb7t", AUTO_SPIN_NOT_CHANGE_MONEY_TYPE: "\u0110ang t\u1ef1 \u0111\u1ed9ng quay kh\xf4ng \u0111\u01b0\u1ee3c thay \u0111\u1ed5i lo\u1ea1i ti\u1ec1n", SPIN_TOO_FAST: "Quay qu\xe1 nhanh", GAME_STOP_SPIN: "Vui l\xf2ng ch\u1edd v\xf2ng quay k\u1ebft th\xfac", MINIGAME_ID: "#{0}", TAIXIU_HISTORIES_DETAIL: "Phi\xean ch\u01a1i {0} - {1}", TAIXIU_BALANCE_DOOR: "Tr\u1ea3 ti\u1ec1n c\xe2n c\u1eeda", TAIXIU_YOU_NOT_BET: "Vui l\xf2ng nh\u1eadp ti\u1ec1n c\u01b0\u1ee3c", TAIXIU_CHAIN_WIN: "Chu\u1ed7i th\u1eafng: {0}", TAIXIU_CHAIN_LOSE: "Chu\u1ed7i thua: {0}", TRENDUOI_CLICK_PLAY: "B\u1ea5m v\xe0o PLAY \u0111\u1ec3 b\u1eaft \u0111\u1ea7u ch\u01a1i", TRENDUOI_STOP_SPINING: "Vui l\xf2ng ch\u1edd v\xf2ng quay k\u1ebft th\xfac", TRENDUOI_FINISH: "K\u1ebft th\xfac", TRENDUOI_LOSE: "B\u1ea1n \u0111\xe3 thua. Ch\xfac b\u1ea1n may m\u1eafn l\u1ea7n sau", BAU_CUA_NEXT_TURN: "L\u01b0\u1ee3t ti\u1ebfp theo", BAU_CUA_BET: "\u0110\u1eb7t c\u01b0\u1ee3c", BAU_CUA_TOP_WEEK_TITLE: "Top tu\u1ea7n" }, "TAIXIU_CHAIN_WIN", "Hi\u1ec7n t\u1ea1i: {0}"), o(n, "TAIXIU_CHAIN_LOSE", "Hi\u1ec7n t\u1ea1i: {0}"), o(n, "TAIXIU_CHAIN", "S\u1ef1 ki\u1ec7n \u0111ua d\xe2y t\xe0i x\u1ec9u"), o(n, "TAIXIU_CURRENT_CHAIN_WIN", "D\xe0i nh\u1ea5t: {0}"), o(n, "TAIXIU_CURRENT_CHAIN_LOSE", "D\xe0i nh\u1ea5t: {0}"), o(n, "DRAGON_TIGER_CHAIN_WIN", "D\xe0i nh\u1ea5t: {0}"), o(n, "DRAGON_TIGER_CHAIN_LOSE", "D\xe0i nh\u1ea5t: {0}"), o(n, "DRAGON_TIGER_CURRENT_CHAIN_WIN", "Hi\u1ec7n t\u1ea1i: {0}"), o(n, "DRAGON_TIGER_CURRENT_CHAIN_LOSE", "Hi\u1ec7n t\u1ea1i: {0}"), o(n, "DRAGON_TIGER_CHAIN", "S\u1ef1 ki\u1ec7n \u0111ua d\xe2y long h\u1ed5"), o(n, "DRAGON_TIGER_NO_BET_SELECTED", "Vui l\xf2ng ch\u1ecdn m\u1ee9c c\u01b0\u1ee3c"), o(n, "MINI_GAME_RANK_TITLE", "B\u1ea2NG X\u1ebeP H\u1ea0NG"), o(n, "MINI_GAME_RANK_TITLE_TAI_XIU", "B\u1ea2NG X\u1ebeP H\u1ea0NG T\xc0I X\u1ec8U"), o(n, "MINI_GAME_RANK_TITLE_CHAN_LE", "B\u1ea2NG X\u1ebeP H\u1ea0NG CH\u1eb4N L\u1eba"), o(n, "DIAMOND_NO_LINE_SELECTED", "B\u1ea1n ch\u01b0a ch\u1ecdn d\xf2ng \u0111\u1eb7t c\u01b0\u1ee3c"), o(n, "PIRATE_NO_LINE_SELECTED", "B\u1ea1n ch\u01b0a ch\u1ecdn d\xf2ng \u0111\u1eb7t c\u01b0\u1ee3c"), o(n, "LUCKY_WHEEL_IS_SPINING", "Vui l\xf2ng ch\u1edd v\xf2ng quay k\u1ebft th\xfac"), o(n, "LUCKY_WHEEL_CONGRATULATION", "Ch\xfac m\u1eebng b\u1ea1n nh\u1eadn \u0111\u01b0\u1ee3c ph\u1ea7n th\u01b0\u1edfng t\u1eeb V\xf2ng Quay May M\u1eafn"), o(n, "FIREFISH_MIN_BET", "MIN = {0} {1}"), o(n, "FIREFISH_FISHED", "Ng\u01b0\u1eddi ch\u01a1i <color=#FA3030>{0}</color> v\u1eeba gi\u1ebft ch\u1ebft <color=#56EA00>{1}</color> nh\u1eadn \u0111\u01b0\u1ee3c <color=#FAFF1A>{2}</color> {3}"), o(n, "FORGET_PASSWORD_NOTIFICATION", "Vui l\xf2ng li\xean h\u1ec7 v\u1edbi BQT qua Fanpage ho\u1eb7c Hotline: 097 171 4012 \u0111\u1ec3 \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3 ngay b\u1ea1n nh\xe9!"), o(n, "SLOT_NOT_CHANGE_SPIN", "Vui l\xf2ng \u0111\u1ee3i v\xf2ng ch\u01a1i k\u1ebft th\xfac"), o(n, "SLOT2_NOT_SELECT_LINE", "Vui l\xf2ng ch\u1ecdn d\xf2ng c\u01b0\u1ee3c."), o(n, "SLOT2_AUTOSPIN_NOT_CHANGE", "\u0110ang \u1edf ch\u1ebf \u0111\u1ed9 quay t\u1ef1 \u0111\u1ed9ng. B\u1ea1n kh\xf4ng th\u1ec3 th\u1ef1c hi\u1ec7n thao th\xe1c n\xe0y"), o(n, "SLOT2_RANK_1", "Ch\xfac m\u1eebng <color = #F7A200>{0}</color> \u0111\xe3 d\xe0nh \u0111\u01b0\u1ee3c H\u0169 <color = #F7A200>{1}</color> KAY v\xe0o l\xfac {2}"), o(n, "SLOT2_RANK_2", "TK <color = #F7A200>{0}</color> th\u1eafng <color = #F7A200>{1}</color> KAY {2} tr\u01b0\u1edbc"), o(n, "SLOT2_HISTORY", "B\u1ea1n ch\u01a1i ph\xf2ng {0} v\xe0 nh\u1eadn \u0111\u01b0\u1ee3c <color = #F7A200>{1}</color> {2} tr\u01b0\u1edbc"), o(n, "SLOT2_NOT_PLAY", "Vui l\xf2ng \u0111\u1ee3i v\xf2ng quay k\u1ebft th\xfac"), o(n, "SLOT3_NOT_SELECT_LINE", "Vui l\xf2ng ch\u1ecdn d\xf2ng c\u01b0\u1ee3c."), o(n, "SLOT3_AUTOSPIN_NOT_CHANGE", "\u0110ang \u1edf ch\u1ebf \u0111\u1ed9 quay t\u1ef1 \u0111\u1ed9ng. B\u1ea1n kh\xf4ng th\u1ec3 th\u1ef1c hi\u1ec7n thao th\xe1c n\xe0y"), o(n, "SLOT3_RANK_1", "Ch\xfac m\u1eebng <color = #F7A200>{0}</color> \u0111\xe3 d\xe0nh \u0111\u01b0\u1ee3c h\u0169 <color = #F7A200>{1}</color> KAY v\xe0o l\xfac {2}"), o(n, "SLOT3_RANK_2", "TK <color = #F7A200>{0}</color> th\u1eafng <color = #F7A200>{1}</color> KAY {2} tr\u01b0\u1edbc"), o(n, "SLOT3_HISTORY", "B\u1ea1n ch\u01a1i ph\xf2ng {0} v\xe0 nh\u1eadn \u0111\u01b0\u1ee3c <color = #F7A200>{1}</color> {2} tr\u01b0\u1edbc"), o(n, "MESSAGE_FORBIDDEN", ["napkay"]), o(n, "SPLASH_GET_GET_DATA", "\u0110ang l\u1ea5y d\u1eef li\u1ec7u game ..."), o(n, "SPLASH_GET_CONFIG_FAILED", "L\u1ea5y d\u1eef li\u1ec7u th\u1ea5t b\u1ea1i"), o(n, "HOT_UPDATE_CHECKING_VERSION", "\u0110ang ki\u1ec3m tra phi\xean b\u1ea3n ..."), o(n, "HOT_UPDATE_RETRY", "Th\u1eed l\u1ea1i ..."), o(n, "HOT_UPDATE_NOT_FOUND", "Kh\xf4ng t\xecm th\u1ea5y Hot Update ..."), o(n, "HOT_UPDATE_DOWNLOAD_MANIFEST_FAILED", "T\u1ea3i manifest th\u1ea5t b\u1ea1i ..."), o(n, "HOT_UPDATE_ALREADY_UP_TO_DATE", "Phi\xean b\u1ea3n m\u1edbi nh\u1ea5t ..."), o(n, "HOT_UPDATE_FOUND_UPDATE", "T\xecm th\u1ea5y phi\xean b\u1ea3n c\u1eadp nh\u1eadt ..."), o(n, "HOT_UPDATE_UPDATING", "\u0110ang c\u1eadp nh\u1eadt ..."), o(n, "LOTTERY_NOT_NUMBER", "Vui l\xf2ng ch\u1ecdn s\u1ed1"), o(n, "LOTTERY_NOT_BET", "Vui l\xf2ng ch\u1ecdn m\u1ee9c c\u01b0\u1ee3c"), o(n, "LOTTERY_SELECT_LO", "Ch\u1ecdn 1 s\u1ed1 b\u1ea5t k\u1ef3. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi s\u1ed1 \u0111\xf3 c\xf3 trong b\u1ea3ng k\u1ebft qu\u1ea3"), o(n, "LOTTERY_SELECT_DE", "Ch\u1ecdn 1 s\u1ed1 b\u1ea5t k\u1ef3. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi s\u1ed1 \u0111\xf3 v\u1ec1 v\xe0o gi\u1ea3i \u0111\u1eb7c bi\u1ec7t ( gi\u1ea3i cu\u1ed1i c\xf9ng)"), o(n, "LOTTERY_SELECT_CHAN", "C\u01b0\u1ee3c t\u1ea5t c\u1ea3 c\xe1c s\u1ed1 ch\u1eb5n. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi k\u1ebft qu\u1ea3 v\u1ec1 c\xf3 \xedt nh\u1ea5t 14 s\u1ed1 ch\u1eb5n"), o(n, "LOTTERY_SELECT_LE", "C\u01b0\u1ee3c t\u1ea5t c\u1ea3 c\xe1c s\u1ed1 l\u1ebb. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi k\u1ebft qu\u1ea3 v\u1ec1 c\xf3 \xedt nh\u1ea5t 14 s\u1ed1 l\u1ebb"), o(n, "LOTTERY_SELECT_DAU", "Ch\u1ecdn d\xe3y s\u1ed1 b\u1eaft \u0111\u1ea7u b\u1eb1ng s\u1ed1 b\u1ea1n ch\u1ecdn. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi c\xf3 c\xe1c k\u1ebft qu\u1ea3 b\u1eaft \u0111\u1ea7u b\u1eb1ng s\u1ed1 b\u1ea1n \u0111\xe3 ch\u1ecdn"), o(n, "LOTTERY_SELECT_DUOI", "Ch\u1ecdn d\xe3y s\u1ed1 k\u1ebft th\xfac b\u1eb1ng s\u1ed1 b\u1ea1n ch\u1ecdn. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi c\xf3 c\xe1c k\u1ebft qu\u1ea3 k\u1ebft th\xfac b\u1eb1ng s\u1ed1 b\u1ea1n \u0111\xe3 ch\u1ecdn"), o(n, "LOTTERY_SELECT_TRANG", " Ch\u1ecdn t\xe2t c\u1ea3 c\xe1c s\u1ed1 trong \xf4 tr\u1eafng. B\u1ea1n s\u1ebd th\u1eafng khi k\u1ebft qu\u1ea3 v\u1ec1 \xedt nh\u1ea5t c\xf3 14 s\u1ed1 trong \xf4 tr\u1eafng"), o(n, "LOTTERY_SELECT_DO", "Ch\u1ecdn t\xe2t c\u1ea3 c\xe1c s\u1ed1 trong \xf4 \u0111\u1ecf. B\u1ea1n s\u1ebd th\u1eafng khi k\u1ebft qu\u1ea3 v\u1ec1 \xedt nh\u1ea5t c\xf3 14 s\u1ed1 trong \xf4 \u0111\u1ecf"), o(n, "LOTTERY_SELECT_XIEN_2", "Ch\u1ecdn 2 s\u1ed1 b\u1ea5t k\u1ef3. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi c\u1ea3 2 s\u1ed1 \u0111\xf3 c\xf3 trong b\u1ea3ng k\u1ebft qu\u1ea3"), o(n, "LOTTERY_SELECT_XIEN_3", "Ch\u1ecdn 3 s\u1ed1 b\u1ea5t k\u1ef3. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi c\u1ea3 3 s\u1ed1 \u0111\xf3 c\xf3 trong b\u1ea3ng k\u1ebft qu\u1ea3"), o(n, "LOTTERY_SELECT_XIEN_4", "Ch\u1ecdn 4 s\u1ed1 b\u1ea5t k\u1ef3. B\u1ea1n s\u1ebd th\u1eafng c\u01b0\u1ee3c khi c\u1ea3 4 s\u1ed1 \u0111\xf3 c\xf3 trong b\u1ea3ng k\u1ebft qu\u1ea3"), o(n, "LOTTERY_SELECT_HU", "Ch\u1ecdn 10 s\u1ed1 b\u1ea5t k\u1ef3. B\u1ea1n s\u1ebd th\u1eafng 50% h\u0169 khi k\u1ebft qu\u1ea3 v\u1ec1 kh\xf4ng c\xf3 10 s\u1ed1 \u0111\xe3 ch\u1ecdn (l\xf4 tr\u01b0\u1ee3t), ph\xed c\u01b0\u1ee3c 10k"), o(n, "LOTTERY_SELECT_REBETS", "C\u01b0\u1ee3c l\u1ea1i to\xe0n b\u1ed9 th\xf4ng tin \u0111\u1eb7t c\u1ee7a b\u1ea1n phi\xean ch\u01a1i tr\u01b0\u1edbc"), o(n, "LOTTERY_FIRST_BETS_NOT_SELECT", "Phi\xean tr\u01b0\u1edbc b\u1ea1n ch\u01b0a c\u01b0\u1ee3c g\xec"), o(n, "LOTTERY_BETS_NOT_FORMAT", "S\u1ed1 l\u01b0\u1ee3ng s\u1ed1 kh\xf4ng \u0111\xfang v\u1edbi ki\u1ec3u c\u01b0\u1ee3c"), o(n, "LOTTERY_NOT_CHANGE_BET", "Vui l\xf2ng \u0111\u1eb7t c\u01b0\u1ee3c song ho\u1eb7c \u0111\u1eb7t c\u01b0\u1ee3c l\u1ea1i"), o(n, "LOTTERY_NOT_START", "V\xf2ng quay m\u1edbi ch\u01b0a \u0111\u01b0\u1ee3c b\u1eaft \u0111\u1ea7u"), o(n, "LOTTERY_SELECT_TYPE", "Vui l\xf2ng ch\u1ecdn ki\u1ec3u c\u01b0\u1ee3c"), o(n, "LOTTERY_BET_DE", "<b>\u0110\u1ec1</b>: {0} - ({1})"), o(n, "LOTTERY_BET_LO", "<b>L\xf4</b>: {0} - ({1})"), o(n, "LOTTERY_BET_XIEN_2", "<b>Xi\xean 2</b>: {0} - ({1})"), o(n, "LOTTERY_BET_XIEN_3", "<b>Xi\xean 3</b>: {0} - ({1})"), o(n, "LOTTERY_BET_XIEN_4", "<b>Xi\xean 4</b>: {0} - ({1})"), o(n, "LOTTERY_BET_CHAN", "<b>Ch\u1eb5n</b>: ({0})"), o(n, "LOTTERY_BET_LE", "<b>L\u1ebb</b>: ({0})"), o(n, "LOTTERY_BET_DAU", "<b>\u0110\u1ea7u</b>: {0} - ({1})"), o(n, "LOTTERY_BET_DUOI", "<b>\u0110u\xf4i</b>: {0} - ({1})"), o(n, "LOTTERY_BET_DO", "<b>\u0110\u1ecf</b>: ({0})"), o(n, "LOTTERY_BET_TRANG", "<b>Tr\u1eafng</b>: ({0})"), o(n, "LOTTERY_BET_HU", "<b>H\u0169</b>: {0} - ({1})"), o(n, "LOTTERY_BET_DE_2", "<b>\u0110\u1ec1</b>: {0} - ({1})"), o(n, "LOTTERY_BET_HU_2", "<b>H\u0169</b>: {0} - ({1})"), o(n, "LOTTERY_CHAT", " <color = #FCC63C>Ch\xfac m\u1eebng t\xe0i kho\u1ea3n {0} \u0111\xe3 th\u1eafng {1} ({2})</color>"), n);
        e.exports = c, cc._RF.pop()
    }, {}],
    MienBac_dauduoi: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "83b23eeLdtMUbFVBt1RFVz6", "MienBac_dauduoi");
        var n = t("Helper");
        t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { node_select: cc.Node, item_select: cc.Prefab, soCuoc: cc.Label, soDiem: cc.Label, tongTien: cc.Label, inputSoDiem: cc.EditBox, max: 10, countSelect: 0, giaDiem: 22e3, diemToiDa: 1e6, game: "" },
            onLoad: function() {
                for (var t = [], e = 0; e < 10; e++) {
                    var i = cc.instantiate(this.item_select);
                    (i = i.getComponent("XoSo_select_item")).init(this), i.text.string = n.addZero10(e), this.node_select.addChild(i.node), t[e] = i
                }
                this.node_select = t, t = null, this.inputSoDiem.node.on("text-changed", this.onUpdateDiem, this)
            },
            onEnable: function() { cc.sys.isBrowser },
            onDisable: function() { cc.sys.isBrowser },
            refresh: function() {
                var t = "";
                this.node_select.forEach(function(e) { e.select && (t += e.text.string + ", ") }), this.soCuoc.string = t, this.updateTien()
            },
            refreshH: function(t) {!0 === t.select ? this.countSelect++ : this.countSelect--, this.countSelect > this.max && (t.onChanger(), this.countSelect = this.max, cc.RedT.inGame.addNotice("1 V\xe9 c\u01b0\u1ee3c t\u1ed1i \u0111a " + this.max + " S\u1ed1...")), this.countSelect < 0 && (this.countSelect = 0), this.refresh() },
            onChangerDiem: function() {
                console.log("onChangerDiem:" + this.inputSoDiem.string);
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                this.inputSoDiem.string = "0" == t ? "" : t, this.onUpdateDiem()
            },
            onUpdateDiem: function() {
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                t = "0" === t ? "" : t, 1 * n.getOnlyNumberInString(t) > this.diemToiDa && (t = n.numberWithCommas(this.diemToiDa), cc.RedT.inGame.addNotice("T\u1ed1i \u0111a " + t + " \u0111i\u1ec3m cho m\u1ed7i V\xe9.")), this.soDiem.string = t || "0", this.inputSoDiem.string = t, this.updateTien()
            },
            updateTien: function() {
                var t = 1 * n.getOnlyNumberInString(this.soDiem.string);
                this.tongTien.string = n.numberWithCommas(t * this.giaDiem * this.countSelect)
            },
            onClickHuy: function() { this.soCuoc.string = "", this.soDiem.string = "0", this.tongTien.string = "0", this.inputSoDiem.string = "", this.countSelect = 0, this.node_select.forEach(function(t) { t.select && t.onChanger() }) },
            onClickCuoc: function() {
                if (n.isEmpty(this.soCuoc.string)) cc.RedT.inGame.addNotice("Vui l\xf2ng ch\u1ecdn s\u1ed1 mu\u1ed1n c\u01b0\u1ee3c..");
                else if ("0" === this.soDiem.string) cc.RedT.inGame.addNotice("Vui l\xf2ng nh\u1eadp \u0111i\u1ec3m c\u01b0\u1ee3c..");
                else {
                    var t = {};
                    t[this.game] = { so: this.soCuoc.string, diem: n.getOnlyNumberInString(this.soDiem.string) }, cc.RedT.send({ g: { xs: { mb: t } } })
                }
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    MienBac_lo2so: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1c435paInNIALLfQ5bJgz3H", "MienBac_lo2so");
        var n = t("Helper");
        t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { node_select: cc.Node, item_select: cc.Prefab, soCuoc: cc.Label, soDiem: cc.Label, tongTien: cc.Label, inputSoDiem: cc.EditBox, max: 10, countSelect: 0, giaDiem: 22e3, diemToiDa: 1e6, game: "" },
            onLoad: function() {
                for (var t = [], e = 0; e < 100; e++) {
                    var i = cc.instantiate(this.item_select);
                    (i = i.getComponent("XoSo_select_item")).init(this), i.text.string = n.addZero10(e), this.node_select.addChild(i.node), t[e] = i
                }
                this.node_select = t, t = null
            },
            onEnable: function() { cc.sys.isBrowser },
            onDisable: function() { cc.sys.isBrowser },
            refresh: function() {
                var t = "";
                this.node_select.forEach(function(e) { e.select && (t += e.text.string + ", ") }), this.soCuoc.string = t, this.updateTien()
            },
            refreshH: function(t) {!0 === t.select ? this.countSelect++ : this.countSelect--, this.countSelect > this.max && (t.onChanger(), this.countSelect = this.max, cc.RedT.inGame.addNotice("1 V\xe9 c\u01b0\u1ee3c t\u1ed1i \u0111a " + this.max + " S\u1ed1...")), this.countSelect < 0 && (this.countSelect = 0), this.refresh() },
            onChangerDiem: function() {
                console.log("onChangerDiem:" + this.inputSoDiem.string);
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                this.inputSoDiem.string = "0" == t ? "" : t, this.onUpdateDiem()
            },
            onUpdateDiem: function() {
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                t = "0" === t ? "" : t, 1 * n.getOnlyNumberInString(t) > this.diemToiDa && (t = n.numberWithCommas(this.diemToiDa), cc.RedT.inGame.addNotice("T\u1ed1i \u0111a " + t + " \u0111i\u1ec3m cho m\u1ed7i V\xe9.")), this.soDiem.string = t || "0", this.inputSoDiem.string = t, this.updateTien()
            },
            updateTien: function() {
                var t = 1 * n.getOnlyNumberInString(this.soDiem.string);
                this.tongTien.string = n.numberWithCommas(t * this.giaDiem * this.countSelect)
            },
            onClickHuy: function() { this.soCuoc.string = "", this.soDiem.string = "0", this.tongTien.string = "0", this.inputSoDiem.string = "", this.countSelect = 0, this.node_select.forEach(function(t) { t.select && t.onChanger() }) },
            onClickCuoc: function() {
                if (n.isEmpty(this.soCuoc.string)) cc.RedT.inGame.addNotice("Vui l\xf2ng ch\u1ecdn s\u1ed1 mu\u1ed1n c\u01b0\u1ee3c..");
                else if ("0" === this.soDiem.string) cc.RedT.inGame.addNotice("Vui l\xf2ng nh\u1eadp \u0111i\u1ec3m c\u01b0\u1ee3c..");
                else {
                    var t = {};
                    t[this.game] = { so: this.soCuoc.string, diem: n.getOnlyNumberInString(this.soDiem.string) }, cc.RedT.send({ g: { xs: { mb: t } } })
                }
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    MienBac_lo3so: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fe72b1SkeFD94urjeOCVDYz", "MienBac_lo3so");
        var n = t("Helper");
        t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { head_select: cc.Node, node_select: cc.Node, item_select: cc.Prefab, soCuoc: cc.Label, soDiem: cc.Label, tongTien: cc.Label, inputSoDiem: cc.EditBox, max: 8, countSelect: 0, giaDiem: 22e3, diemToiDa: 1e6, game: "", head: "100" },
            onLoad: function() {
                for (var t = [], e = 0; e < 100; e++) {
                    var i = cc.instantiate(this.item_select);
                    (i = i.getComponent("XoSo_select_item")).init(this), i.text.string = n.numberPad(e, 3), this.node_select.addChild(i.node), t[e] = i
                }
                this.node_select = t, t = null
            },
            onEnable: function() { cc.sys.isBrowser },
            onDisable: function() { cc.sys.isBrowser },
            onSelectH: function(t) {
                var e = this,
                    i = t.target.name,
                    o = i >> 0;
                this.head = i, this.head_select.children.forEach(function(t) { t.name === i ? (t.pauseSystemEvents(), t.opacity = 255) : (t.resumeSystemEvents(), t.opacity = 99) });
                for (var c = 0; c < 100; c++) this.node_select[c].text.string = n.numberPad(c + o, 3);
                e.node_select.forEach(function(t) { t.selectOff() }), this.head_select.children.forEach(function(t) { void 0 !== t.data && t.data.length > 0 && t.data.forEach(function(t) { e.node_select.forEach(function(e) { e.text.string === t && e.selectOn() }) }) })
            },
            refresh: function() {
                var t = this,
                    e = [],
                    i = "";
                this.node_select.forEach(function(t) { t.select && e.push(t.text.string) }), this.head_select.children.forEach(function(n) { n.name === t.head && (n.data = e), void 0 !== n.data && n.data.length > 0 && (i += n.data.join(", ") + ", ") }), this.soCuoc.string = i, this.updateTien()
            },
            refreshH: function(t) {!0 === t.select ? this.countSelect++ : this.countSelect--, this.countSelect > this.max && (t.onChanger(), this.countSelect = this.max, cc.RedT.inGame.addNotice("1 V\xe9 c\u01b0\u1ee3c t\u1ed1i \u0111a " + this.max + " S\u1ed1...")), this.countSelect < 0 && (this.countSelect = 0), this.refresh() },
            onChangerDiem: function() {
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                this.inputSoDiem.string = "0" == t ? "" : t, this.onUpdateDiem()
            },
            onUpdateDiem: function() {
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                t = "0" === t ? "" : t, 1 * n.getOnlyNumberInString(t) > this.diemToiDa && (t = n.numberWithCommas(this.diemToiDa), cc.RedT.inGame.addNotice("T\u1ed1i \u0111a " + t + " \u0111i\u1ec3m cho m\u1ed7i V\xe9.")), this.soDiem.string = t || "0", this.inputSoDiem.string = t, this.updateTien()
            },
            updateTien: function() {
                var t = 1 * n.getOnlyNumberInString(this.soDiem.string);
                this.tongTien.string = n.numberWithCommas(t * this.giaDiem * this.countSelect)
            },
            onClickHuy: function() { this.soCuoc.string = "", this.soDiem.string = "0", this.tongTien.string = "0", this.inputSoDiem.string = "", this.countSelect = 0, this.node_select.forEach(function(t) { t.select && t.onChanger() }), this.head_select.children.forEach(function(t) { t.data = [] }) },
            onClickCuoc: function() {
                if (n.isEmpty(this.soCuoc.string)) cc.RedT.inGame.addNotice("Vui l\xf2ng ch\u1ecdn s\u1ed1 mu\u1ed1n c\u01b0\u1ee3c..");
                else if ("0" === this.soDiem.string) cc.RedT.inGame.addNotice("Vui l\xf2ng nh\u1eadp \u0111i\u1ec3m c\u01b0\u1ee3c..");
                else {
                    var t = {};
                    t[this.game] = { so: this.soCuoc.string, diem: n.getOnlyNumberInString(this.soDiem.string) }, cc.RedT.send({ g: { xs: { mb: t } } })
                }
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    MienBac_lo4so: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "85972+toCZJjYJwO7NbxkcA", "MienBac_lo4so");
        var n = t("Helper");
        t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { inputSo: cc.EditBox, soCuoc: cc.Label, soDiem: cc.Label, tongTien: cc.Label, inputSoDiem: cc.EditBox, max: 10, countSelect: 0, giaDiem: 22e3, diemToiDa: 1e6, game: "" },
            onEnable: function() { cc.sys.isBrowser },
            onDisable: function() { cc.sys.isBrowser },
            onClickChon: function() {
                var t = this.inputSo.string;
                if (t.length > 4) {
                    var e = [];
                    t.split(" ").forEach(function(t) {
                        t.split(",").forEach(function(t) {
                            t.split(".").forEach(function(t) {
                                t.split(";").forEach(function(t) {
                                    var i = t.split(":");
                                    e = e.concat(i)
                                })
                            })
                        })
                    }), e.forEach(function(t, i) { e[i] = t.trim() });
                    var i = {};
                    (e = e.filter(function(t) { return 4 === t.length && 4 === (t = n.getOnlyNumberInString(t)).length })).forEach(function(t) { void 0 === i[t] && (i[t] = t) }), (e = Object.values(i)).length > 0 ? e.length > this.max ? cc.RedT.inGame.addNotice("1 V\xe9 c\u01b0\u1ee3c t\u1ed1i \u0111a " + this.max + " s\u1ed1 ch\u1ecdn...") : (this.countSelect = e.length, this.soCuoc.string = e.join(", "), this.updateTien()) : (this.countSelect = 0, cc.RedT.inGame.addNotice("S\u1ed1 ch\u1ecdn kh\xf4ng h\u1ee3p l\u1ec7."))
                } else 4 === (t = n.getOnlyNumberInString(t)).length ? (this.countSelect = 1, this.soCuoc.string = t, this.updateTien()) : (this.countSelect = 0, cc.RedT.inGame.addNotice("S\u1ed1 ch\u1ecdn kh\xf4ng h\u1ee3p l\u1ec7."))
            },
            onChangerDiem: function() {
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                this.inputSoDiem.string = "0" == t ? "" : t, this.onUpdateDiem()
            },
            onUpdateDiem: function(t) {
                var e = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                e = "0" === e ? "" : e, 1 * n.getOnlyNumberInString(e) > this.diemToiDa && (e = n.numberWithCommas(this.diemToiDa), cc.RedT.inGame.addNotice("T\u1ed1i \u0111a " + e + " \u0111i\u1ec3m cho m\u1ed7i V\xe9.")), this.soDiem.string = e || "0", this.inputSoDiem.string = e, this.updateTien()
            },
            updateTien: function() {
                var t = 1 * n.getOnlyNumberInString(this.soDiem.string);
                this.tongTien.string = n.numberWithCommas(t * this.giaDiem * this.countSelect)
            },
            onClickHuy: function() { this.soCuoc.string = "", this.soDiem.string = "0", this.tongTien.string = "0", this.inputSoDiem.string = "", this.countSelect = 0 },
            onClickCuoc: function() {
                if (n.isEmpty(this.soCuoc.string)) cc.RedT.inGame.addNotice("Vui l\xf2ng ch\u1ecdn s\u1ed1 mu\u1ed1n c\u01b0\u1ee3c..");
                else if ("0" === this.soDiem.string) cc.RedT.inGame.addNotice("Vui l\xf2ng nh\u1eadp \u0111i\u1ec3m c\u01b0\u1ee3c..");
                else {
                    var t = {};
                    t[this.game] = { so: this.soCuoc.string, diem: n.getOnlyNumberInString(this.soDiem.string) }, cc.RedT.send({ g: { xs: { mb: t } } })
                }
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    MienBac_lo: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "95087LD6J9FGZx4jUkDcl1V", "MienBac_lo"), cc.Class({
            extends: cc.Component,
            properties: { header: cc.Node, body: cc.Node },
            onLoad: function() {},
            onSelectType: function(t) {
                var e = t.target.name;
                this.header.children.forEach(function(t) { t.name === e ? (t.pauseSystemEvents(), t.opacity = 255) : (t.resumeSystemEvents(), t.opacity = 99) }), this.body.children.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 })
            }
        }), cc._RF.pop()
    }, {}],
    MienBac_loxien: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "939fbzgGFhCHInPOAJ2Nm9g", "MienBac_loxien");
        var n = t("Helper"),
            o = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { node_select: cc.Node, item_select: cc.Prefab, soCuoc: cc.Label, soDiem: cc.Label, tongTien: cc.Label, inputSoDiem: cc.EditBox, max: 10, countSelect: 0, giaDiem: 22e3, diemToiDa: 1e6, game: "" },
            onLoad: function() {
                for (var t = [], e = 0; e < 100; e++) {
                    var i = cc.instantiate(this.item_select);
                    (i = i.getComponent("XoSo_select_item")).init(this), i.text.string = n.addZero10(e), this.node_select.addChild(i.node), t[e] = i
                }
                this.node_select = t, t = null
            },
            onEnable: function() { cc.sys.isBrowser && o.inputAddEvent(this.inputSoDiem, "input", this.onUpdateDiem.bind(this)) },
            onDisable: function() { cc.sys.isBrowser && o.inputRemoveEvent(this.inputSoDiem, "input", this.onUpdateDiem.bind(this)) },
            refresh: function() {
                var t = "";
                this.node_select.forEach(function(e) { e.select && (t += e.text.string + ", ") }), this.soCuoc.string = t, this.updateTien()
            },
            refreshH: function(t) {!0 === t.select ? this.countSelect++ : this.countSelect--, this.countSelect > this.max && (t.onChanger(), this.countSelect = this.max, cc.RedT.inGame.addNotice("1 V\xe9 c\u01b0\u1ee3c t\u1ed1i \u0111a " + this.max + " S\u1ed1...")), this.countSelect < 0 && (this.countSelect = 0), this.refresh() },
            onChangerDiem: function() {
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                this.inputSoDiem.string = "0" == t ? "" : t, this.onUpdateDiem()
            },
            onUpdateDiem: function() {
                var t = n.numberWithCommas(n.getOnlyNumberInString(this.inputSoDiem.string));
                t = "0" === t ? "" : t, 1 * n.getOnlyNumberInString(t) > this.diemToiDa && (t = n.numberWithCommas(this.diemToiDa), cc.RedT.inGame.addNotice("T\u1ed1i \u0111a " + t + " \u0111i\u1ec3m cho m\u1ed7i V\xe9.")), this.soDiem.string = t || "0", this.inputSoDiem.string = t, this.updateTien()
            },
            updateTien: function() {
                var t = 0;
                this.countSelect === this.max && (t = 1);
                var e = 1 * n.getOnlyNumberInString(this.soDiem.string);
                this.tongTien.string = n.numberWithCommas(e * this.giaDiem * t)
            },
            onClickHuy: function() { this.soCuoc.string = "", this.soDiem.string = "0", this.tongTien.string = "0", this.inputSoDiem.string = "", this.countSelect = 0, this.node_select.forEach(function(t) { t.select && t.onChanger() }) },
            onClickCuoc: function() {
                if (this.countSelect !== this.max) cc.RedT.inGame.addNotice("Vui l\xf2ng ch\u1ecdn \u0111\u1ee7 " + this.max + " s\u1ed1 mu\u1ed1n c\u01b0\u1ee3c...");
                else if ("0" === this.soDiem.string) cc.RedT.inGame.addNotice("Vui l\xf2ng nh\u1eadp \u0111i\u1ec3m c\u01b0\u1ee3c..");
                else {
                    var t = {};
                    t[this.game] = { so: this.soCuoc.string, diem: n.getOnlyNumberInString(this.soDiem.string) }, cc.RedT.send({ g: { xs: { mb: t } } })
                }
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    Mini3Cay_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1e051nPL7JFfrzu7siEPQ+Q", "Mini3Cay_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, cointRed: cc.Node, cointXu: cc.Node, red: !0 },
            init: function(t) { this.RedT = t },
            onLoad: function() {
                var t = this;
                this.page = cc.instantiate(this.page), this.page.y = -307, this.node.addChild(this.page), this.page = this.page.getComponent("Pagination"), Promise.all(this.content.children.map(function(t) { return t.getComponent("Mini3Cay_ihistory") })).then(function(e) { t.content = e }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { mini3cay: { logs: { red: this.red, page: t } } } }) },
            changerCoint: function() { this.red = !this.red, this.cointRed.active = !this.cointRed.active, this.cointXu.active = !this.cointXu.active, this.get_data() },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), Promise.all(this.content.map(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.cuoc.string = n.numberWithCommas(o.bet), e.win.string = n.numberWithCommas(o.win), Promise.all(e.kq.map(function(t, e) { t.spriteFrame = cc.RedT.util.card.getCard(o.kq[e].card, o.kq[e].type) }))) : e.node.active = !1
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Mini3Cay_ihistory: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d4891jUjldP9bIGVML2EuXS", "Mini3Cay_ihistory"), cc.Class({ extends: cc.Component, properties: { time: cc.Label, phien: cc.Label, cuoc: cc.Label, kq: { default: [], type: cc.Sprite }, win: cc.Label } }), cc._RF.pop()
    }, {}],
    Mini3Cay_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "8defcIVF4lEJoEox0Os2KJA", "Mini3Cay_reel"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.card = [];
                var i = this;
                Promise.all([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(function(t, e) { var n = cc.instantiate(i.RedT.cardf); return n.width = 73.45, n.height = 104.65, i.node.addChild(n), n.getComponent(cc.Sprite) })).then(function(t) { e.card = t, e.random(!0) })
            },
            random: function(t) {
                void 0 === t && (t = !1);
                Promise.all(this.card.map(function(e, i) { t ? e.spriteFrame = cc.RedT.util.card.random(9) : 0 !== i && 20 !== i && (e.spriteFrame = cc.RedT.util.card.random(9)) }))
            },
            spin: function(t) {
                this.node.stopAllActions();
                var e = cc.moveTo(this.RedT.speed(), cc.v2(this.node.x, -(this.node.height - 104.65))).easing(cc.easeInOut(3)),
                    i = cc.callFunc(function() { this.card[20].spriteFrame = this.card[0].spriteFrame, this.node.y = 0 }, this);
                if (2 === t) {
                    cc.callFunc(function() { this.RedT.isAuto ? this.RedT.sendSpin() : this.RedT.offSpin() }, this);
                    var n = cc.callFunc(function() { this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, i, cc.delayTime(.1), n))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, i))
            },
            stop: function() { this.node.stopAllActions(), void 0 !== this.card && void 0 !== this.card[20] && void 0 !== this.card[20].spriteFrame && (this.card[20].spriteFrame = this.card[0].spriteFrame), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    Mini3Cay_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2c6da1F/j5K0YtLq6E2eBDu", "Mini3Cay_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, cointRed: cc.Node, cointXu: cc.Node, red: !0 },
            init: function(t) { this.RedT = t },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { mini3cay: { tops: this.red } } }) },
            changerCoint: function() { this.red = !this.red, this.cointRed.active = !this.cointRed.active, this.cointXu.active = !this.cointXu.active, this.get_data() },
            onData: function(t) {
                this.content.destroyAllChildren();
                var e = this;
                Promise.all(t.map(function(t, i) {
                    var o = cc.instantiate(e.item),
                        c = o.getComponent("Mini3Cay_ihistory");
                    c.time.string = n.getStringDateByTime(t.time), c.phien.string = t.name, c.cuoc.string = n.numberWithCommas(t.bet), c.win.string = n.numberWithCommas(t.win), Promise.all(c.kq.map(function(e, i) { e.spriteFrame = cc.RedT.util.card.getCard(t.kq[i].card, t.kq[i].type) })), o.children[0].active = !(1 & i), e.content.addChild(o)
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Mini3Cay: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "13a60eyHkJAyIXkNqrmxLrv", "Mini3Cay");
        var n = t("Helper"),
            o = t("Mini3Cay_reel");
        cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, buttonSpin: cc.Node, buttonAuto: cc.Node, buttonSpeed: cc.Node, buttonStop: cc.Node, buttonAutoDot: cc.Node, buttonSpeedDot: cc.Node, reels: { default: [], type: o }, bet: cc.Node, notice: cc.Node, prefabNotice: cc.Prefab, cardf: cc.Prefab, cuoc: "", hu: cc.Label, isAuto: !1, isSpeed: !1, isSpin: !1 },
            init: function(t) { this.RedT = t, this.LichSu = t.Dialog.Mini3Cay_history, this.Top = t.Dialog.Mini3Cay_top, cc.RedT.setting.mini3cay = cc.RedT.setting.mini3cay || { scale: 1 }, "true" == localStorage.getItem("mini3cay") && (this.node.active = !0), void 0 !== cc.RedT.setting.mini3cay.position && (this.node.position = cc.RedT.setting.mini3cay.position), void 0 !== cc.RedT.setting.mini3cay.bet && cc.RedT.setting.mini3cay.bet != this.cuoc && this.intChangerBet(), void 0 !== cc.RedT.setting.mini3cay.isSpeed && this.isSpeed != cc.RedT.setting.mini3cay.isSpeed && this.onClickSpeed(), void 0 !== cc.RedT.setting.mini3cay.isAuto && this.isAuto != cc.RedT.setting.mini3cay.isAuto && this.onClickAuto() },
            onLoad: function() {
                this.ttOffset = null;
                var t = this;
                this.reels.forEach(function(e) { e.init(t) })
            },
            onEnable: function() { this.onGetHu(), this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this), this.onCloseGame() },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.mini3cay.position = this.node.position },
            openGame: function() { this.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("mini3cay", !0), this.setTop()) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { cc.RedT.audio.playUnClick(), this.node.active = !1, localStorage.setItem("mini3cay", !1) },
            setTop: function() { cc.RedT.setting.mini3cay.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            intChangerBet: function() {
                var t = this;
                this.bet.children.forEach(function(e) { e.name == cc.RedT.setting.mini3cay.bet ? (t.cuoc = e.name, e.children[0].active = !0, e.pauseSystemEvents()) : (e.children[0].active = !1, e.resumeSystemEvents()) })
            },
            changerBet: function(t, e) {
                this.cuoc = cc.RedT.setting.mini3cay.bet = e;
                var i = t.target;
                this.bet.children.forEach(function(t) { t == i ? (t.children[0].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !1, t.resumeSystemEvents()) }), this.onGetHu()
            },
            playClick: function() { cc.RedT.audio.playClick() },
            onClickSpeed: function() { this.isSpeed = cc.RedT.setting.mini3cay.isSpeed = !this.isSpeed, this.buttonSpeedDot.active = !this.buttonSpeedDot.active, this.buttonSpeed.color = this.isSpeed ? cc.Color.WHITE : this.buttonSpeed.color.fromHEX("#A0A0A0") },
            onClickAuto: function() { this.isAuto = cc.RedT.setting.mini3cay.isAuto = !this.isAuto, this.buttonAutoDot.active = !this.buttonAutoDot.active, this.buttonAuto.color = this.isAuto ? cc.Color.WHITE : this.buttonAuto.color.fromHEX("#A0A0A0"), this.buttonStop.active = !!this.isSpin && !!this.isAuto },
            onClickStop: function() { this.onClickAuto(), this.buttonStop.active = !1 },
            onClickSpin: function() { this.isSpin || (this.isSpin = !0, this.onSpin(), this.sendSpin()) },
            sendSpin: function() { cc.RedT.send({ g: { mini3cay: { spin: { cuoc: this.cuoc } } } }) },
            random: function(t) { void 0 === t && (t = !1), this.reels.forEach(function(e) { e.random(t) }) },
            autoSpin: function() { this.random(), this.reels.forEach(function(t, e) { t.spin(e) }) },
            onSpin: function() { this.buttonSpin.pauseSystemEvents(), this.bet.children.forEach(function(t) { t.pauseSystemEvents() }) },
            offSpin: function() { this.isSpin = this.buttonStop.active = !1, this.buttonSpin.resumeSystemEvents(), this.bet.children.forEach(function(t) { t.children[0].active || t.resumeSystemEvents() }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.notice.addChild(e)
            },
            onCloseGame: function() { this.isSpin = !1, this.reels.forEach(function(t) { t.stop() }), this.offSpin(), void 0 !== this.timeOut && clearTimeout(this.timeOut) },
            onData: function(t) {
                var e = this;
                void 0 !== t.status && (1 === t.status ? (this.buttonStop.active = !!this.isAuto, void 0 !== t.win && t.win > 0 ? (this.win = t.win, this.winC = t.code, this.winT = t.text) : this.win = 0, t.card.forEach(function(t, i) { e.reels[i].card[0].spriteFrame = cc.RedT.util.card.getCard(t.card, t.type) }), this.autoSpin()) : this.offSpin()), void 0 !== t.logs && this.LichSu.onData(t.logs), void 0 !== t.tops && this.Top.onData(t.tops), void 0 !== t.notice && this.addNotice(t.notice)
            },
            hieuUng: function() {
                if (void 0 !== this.win && this.win > 0)
                    if (6 == this.winC) {
                        this.winC = 0, 1 == this.isAuto && this.onClickStop();
                        var t = cc.instantiate(this.RedT.PrefabNoHu),
                            e = (t = t.getComponent(cc.Animation)).node.children[6].getComponent(cc.Label);
                        this.RedT.nodeEfect.addChild(t.node), t.on("play", function() {
                            var i = cc.callFunc(function() { cc.RedT.audio.playEf("winHu"), n.numberTo(e, 0, this.win, 1e3, !0), this.win = 0 }, this);
                            t.node.runAction(cc.sequence(cc.delayTime(.25), i))
                        }, this), t.on("finished", function() { t.node.destroy(), this.hieuUng() }, this), t.play()
                    } else if (5 == this.winC || 4 == this.winC) {
                    var i = cc.instantiate(this.RedT.prefabBigWin);
                    (i = i.getComponent(cc.Animation)).on("finished", function() { i.node.destroy(), this.hieuUng() }, this), i.node.bet = this.win, i.node.position = cc.v2(0, 70), this.notice.addChild(i.node), this.win = 0 == this.winC
                } else {
                    var o = new cc.Node;
                    o.addComponent(cc.Label), (o = o.getComponent(cc.Label)).string = "+" + n.numberWithCommas(this.win), o.font = cc.RedT.util.fontCong, o.lineHeight = 130, o.fontSize = 23, o.node.position = cc.v2(0, 37), this.notice.addChild(o.node), o.node.runAction(cc.sequence(cc.moveTo(this.isSpeed ? 2 : 3.5, cc.v2(0, 100)), cc.callFunc(function() { o.node.destroy(), this.hieuUng() }, this))), this.addNotice(this.winT), this.win = 0
                } else this.isAuto ? this.timeOut = setTimeout(function() { this.sendSpin() }.bind(this), this.isSpeed ? 250 : 1e3) : this.offSpin()
            },
            onGetHu: function() {
                if (this.node.active && void 0 !== cc.RedT.setting.topHu.data) {
                    var t = cc.RedT.setting.topHu.data.mini3cay.filter(function(t) { return t.type == this.cuoc }.bind(this)),
                        e = n.getOnlyNumberInString(this.hu.string),
                        i = t[0].bet;
                    e - i != 0 && n.numberTo(this.hu, e, i, 2e3, !0)
                }
            },
            speed: function() { return this.isSpeed ? 1.2 : 2.5 }
        }), cc._RF.pop()
    }, { Helper: "Helper", Mini3Cay_reel: "Mini3Cay_reel" }],
    MiniDialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3492eBS2vhBuLOdLyde5NgL", "MiniDialog");
        var n = t("TaiXiuLichSuPhien"),
            o = t("TaiXiuLichSu"),
            c = t("MiniPoker_LichSu"),
            s = t("MiniPoker_Top"),
            a = t("BigBabol_LichSu"),
            h = t("BigBabol_Top"),
            r = t("BauCua_LichSu"),
            d = t("BauCua_top"),
            u = t("Mini3Cay_history"),
            l = t("Mini3Cay_top"),
            p = t("CaoThap_history"),
            g = t("CaoThap_top"),
            m = t("AngryBird_history"),
            f = t("AngryBird_top"),
            v = t("dialogHuongDan"),
            T = t("MegaJ_history"),
            b = t("MegaJ_top"),
            _ = t("TaiXiuTop"),
            C = t("dialog_VipPoint");
        cc.Class({ extends: cc.Component, properties: { TaiXiuLichSuPhien: n, TaiXiuLichSu: o, TaiXiuTop: _, MiniPoker_LichSu: c, MiniPoker_Top: s, BigBabol_LichSu: a, BigBabol_Top: h, BauCua_LichSu: r, BauCua_top: d, Mini3Cay_history: u, Mini3Cay_top: l, CaoThap_history: p, CaoThap_top: g, AngryBird_history: m, AngryBird_top: f, MegaJ_history: T, MegaJ_top: b, HuongDan: v, VipPoint: C }, init: function(t) { this.objShow = null, this.objTmp = null, this.TaiXiuLichSuPhien.init(t.TaiXiu), this.BauCua_LichSu.init(t.BauCua), this.HuongDan.init() }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), t.previous = null), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, this.objShow.previous = null, this.objShow = null) : this.node.active = !1 }, showTaiXiuLichSuPhien: function() { this.node.active = this.TaiXiuLichSuPhien.node.active = !0, this.objShow = this.TaiXiuLichSuPhien.node }, showTaiXiuLichSu: function() { this.node.active = this.TaiXiuLichSu.node.active = !0, this.objShow = this.TaiXiuLichSu.node }, showTaiXiuTop: function() { this.node.active = this.TaiXiuTop.node.active = !0, this.objShow = this.TaiXiuTop.node }, showMiniPokerLichSu: function() { this.node.active = this.MiniPoker_LichSu.node.active = !0, this.objShow = this.MiniPoker_LichSu.node }, showMiniPokerTop: function() { this.node.active = this.MiniPoker_Top.node.active = !0, this.objShow = this.MiniPoker_Top.node }, showBigBabolLichSu: function() { this.node.active = this.BigBabol_LichSu.node.active = !0, this.objShow = this.BigBabol_LichSu.node }, showBigBabolTop: function() { this.node.active = this.BigBabol_Top.node.active = !0, this.objShow = this.BigBabol_Top.node }, showBauCuaLichSu: function() { this.node.active = this.BauCua_LichSu.node.active = !0, this.objShow = this.BauCua_LichSu.node }, showBauCuaTop: function() { this.node.active = this.BauCua_top.node.active = !0, this.objShow = this.BauCua_top.node }, showMini3Cay_history: function() { this.node.active = this.Mini3Cay_history.node.active = !0, this.objShow = this.Mini3Cay_history.node }, showMini3Cay_top: function() { this.node.active = this.Mini3Cay_top.node.active = !0, this.objShow = this.Mini3Cay_top.node }, showCaoThap_history: function() { this.node.active = this.CaoThap_history.node.active = !0, this.objShow = this.CaoThap_history.node }, showCaoThap_top: function() { this.node.active = this.CaoThap_top.node.active = !0, this.objShow = this.CaoThap_top.node }, showAngryBird_history: function() { this.node.active = this.AngryBird_history.node.active = !0, this.objShow = this.AngryBird_history.node }, showAngryBird_top: function() { this.node.active = this.AngryBird_top.node.active = !0, this.objShow = this.AngryBird_top.node }, showMegaJ_history: function() { this.node.active = this.MegaJ_history.node.active = !0, this.objShow = this.MegaJ_history.node }, showMegaJ_top: function() { this.node.active = this.MegaJ_top.node.active = !0, this.objShow = this.MegaJ_top.node }, showHuongDan: function(t, e) { this.node.active = this.HuongDan.node.active = !0, this.objShow = this.HuongDan.node, this.HuongDan.select(e) }, showVipPoint: function(t) { this.node.active = this.VipPoint.node.active = !0, this.objShow = this.VipPoint.node } }), cc._RF.pop()
    }, { AngryBird_history: "AngryBird_history", AngryBird_top: "AngryBird_top", BauCua_LichSu: "BauCua_LichSu", BauCua_top: "BauCua_top", BigBabol_LichSu: "BigBabol_LichSu", BigBabol_Top: "BigBabol_Top", CaoThap_history: "CaoThap_history", CaoThap_top: "CaoThap_top", MegaJ_history: "MegaJ_history", MegaJ_top: "MegaJ_top", Mini3Cay_history: "Mini3Cay_history", Mini3Cay_top: "Mini3Cay_top", MiniPoker_LichSu: "MiniPoker_LichSu", MiniPoker_Top: "MiniPoker_Top", TaiXiuLichSu: "TaiXiuLichSu", TaiXiuLichSuPhien: "TaiXiuLichSuPhien", TaiXiuTop: "TaiXiuTop", dialogHuongDan: "dialogHuongDan", dialog_VipPoint: "dialog_VipPoint" }],
    MiniPanel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ccccah+dOlLRKuFndZetoIH", "MiniPanel"), cc.Class({
            extends: cc.Component,
            properties: { minigame: cc.Node, Dialog: cc.Node, TaiXiu: cc.Node, MiniPoker: cc.Node, BigBabol: cc.Node, BauCua: cc.Node, BaCay: cc.Node, CaoThap: cc.Node, AngryBirds: cc.Node, MegaJackpot: cc.Node, TopHu: cc.Node, nodeEfect: cc.Node, PrefabNoHu: cc.Prefab, prefabBigWin: cc.Prefab, prefabMiniNotice: cc.Prefab },
            onLoad: function() {
                var t = this;
                this.node._onPreDestroy = function() { t.onDestroy() }, this.TaiXiu = this.TaiXiu.getComponent("TaiXiu"), this.MiniPoker = this.MiniPoker.getComponent("MiniPoker"), this.BigBabol = this.BigBabol.getComponent("BigBabol"), this.BauCua = this.BauCua.getComponent("BauCua"), this.BaCay = this.BaCay.getComponent("Mini3Cay"), this.CaoThap = this.CaoThap.getComponent("CaoThap"), this.AngryBirds = this.AngryBirds.getComponent("AngryBirds"), this.Dialog = this.Dialog.getComponent("MiniDialog"), this.MegaJackpot = this.MegaJackpot.getComponent("MegaJackpot"), this.Dialog.init(this), this.TaiXiu.init(this), this.MiniPoker.init(this), this.BigBabol.init(this), this.BauCua.init(this), this.BaCay.init(this), this.CaoThap.init(this), this.AngryBirds.init(this), this.MegaJackpot.init(this), cc.RedT.IS_LOGIN && this.signIn()
            },
            signIn: function() { this.minigame.active = !0, this.TaiXiu.signIn() },
            newGame: function() { this.minigame.active = !1, this.Dialog.onCloseDialog(), this.TaiXiu.newGame(), this.BauCua.newGame(), this.CaoThap.newGame() },
            onData: function(t) { void 0 !== t.poker && this.MiniPoker.onData(t.poker), void 0 !== t.big_babol && this.BigBabol.onData(t.big_babol), void 0 !== t.baucua && this.BauCua.onData(t.baucua), void 0 !== t.bacay && this.BaCay.onData(t.bacay), void 0 !== t.caothap && this.CaoThap.onData(t.caothap), void 0 !== t.arb && this.AngryBirds.onData(t.arb), void 0 !== t.megaj && this.MegaJackpot.onData(t.megaj) },
            onDestroy: function() { clearInterval(this.TaiXiu.TX_Main.timeInterval), clearTimeout(this.TaiXiu.regTimeOut), clearTimeout(this.TaiXiu.regTimeOut2), clearInterval(this.BauCua.timeInterval), clearTimeout(this.BauCua.regTimeOut), void 0 !== this.CaoThap.timeInterval && clearInterval(this.CaoThap.timeInterval) },
            playClick: function() { cc.RedT.audio.playClick() },
            playUnClick: function() { cc.RedT.audio.playUnClick() },
            setTop: function(t) {
                if (!1 === t.runScale) {
                    t.stopAllActions(), t.runScale = !0;
                    var e = cc.scaleTo(.1, 1);
                    t.runAction(cc.sequence(e, cc.callFunc(function() { this.runScale = !1 }, t)))
                }
                this.minigame.children.forEach(function(e) {
                    if (e.active && e !== t) {
                        e.stopAllActions();
                        var i = cc.scaleTo(.1, .7);
                        e.runAction(cc.sequence(i, cc.callFunc(function() { this.runScale = !1 }, e)))
                    }
                })
            }
        }), cc._RF.pop()
    }, {}],
    MiniPoker_LichSu_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "06f12JQ/QhHLrVF0oulw/q0", "MiniPoker_LichSu_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, phien: cc.Label, bet: cc.Label, win: cc.Label, card: { default: [], type: cc.Sprite } } }), cc._RF.pop()
    }, {}],
    MiniPoker_LichSu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a12b3BIWQdNzY/UVnylxq9K", "MiniPoker_LichSu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, red: !0, isLoad: !1 },
            onLoad: function() {
                var t = cc.instantiate(this.page);
                t.y = -294, this.node.addChild(t), this.page = t.getComponent("Pagination"), this.content = this.content.children.map(function(t) { return t.getComponent("MiniPoker_LichSu_item") }), this.page.init(this)
            },
            onEnable: function() {!this.isLoad && this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), this.isLoad = !0, cc.RedT.send({ g: { mini_poker: { log: { red: this.red, page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.bet.string = n.numberWithCommas(o.bet), e.card.forEach(function(t, e) { t.spriteFrame = cc.RedT.util.card.getCard(o.kq[e].card, o.kq[e].type) }), e.win.string = n.numberWithCommas(o.win)) : e.node.active = !1
                }.bind(this))
            },
            reset: function() { this.isLoad = !1, Promise.all(this.content.children.map(function(t) { t.active = !1 })) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    MiniPoker_Top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f83d50BGs1JUopU47jiZRpB", "MiniPoker_Top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            onEnable: function() { this.get_data() },
            get_data: function() { cc.RedT.send({ g: { mini_poker: { top: this.red } } }) },
            onData: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("VQRed_history_item")).time.string = n.getStringDateByTime(t.time), i.phien.string = t.name, i.cuoc.string = n.numberWithCommas(t.bet), i.line.string = n.numberWithCommas(t.win), i.win.string = 2 === t.type ? "N\u1ed4 H\u0168" : "TH\u1eaeNG L\u1edaN", i.node.children[0].active = !(1 & e), this.content.addChild(i.node)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    MiniPoker_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9effbtyV3ZM8bEtkGsDTJkG", "MiniPoker_reel"), cc.Class({
            extends: cc.Component,
            properties: {},
            init: function(t) {
                var e = this;
                this.RedT = t, this.card = [];
                var i = this;
                Promise.all([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(function(t, e) { var n = cc.instantiate(i.RedT.cardf); return n.width = 95, n.height = 138, i.node.addChild(n), n = n.getComponent(cc.Sprite) })).then(function(t) { e.card = t, e.random(!0) })
            },
            random: function(t) {
                void 0 === t && (t = !1);
                this.card.forEach(function(e, i) { t ? e.spriteFrame = cc.RedT.util.card.random() : 0 !== i && 25 !== i && (e.spriteFrame = cc.RedT.util.card.random()) })
            },
            spin: function(t) {
                this.node.stopAllActions();
                var e = t,
                    i = cc.moveTo(this.RedT.speed(), cc.v2(this.node.x, -(this.node.height - 138))).easing(cc.easeInOut(3)),
                    n = cc.callFunc(function() { this.card[25].spriteFrame = this.card[0].spriteFrame, this.node.y = 0 }, this);
                if (4 === e) {
                    var o = cc.callFunc(function() { this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * e), i, n, o))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * e), i, n))
            },
            stop: function() { this.node.stopAllActions(), void 0 !== this.card && void 0 !== this.card[25] && void 0 !== this.card[25].spriteFrame && (this.card[25].spriteFrame = this.card[0].spriteFrame), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    MiniPoker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ef909PNu9FNDqFtdNzEnAw5", "MiniPoker");
        var n = t("Helper"),
            o = t("MiniPoker_reel");
        cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, buttonSpin: cc.Node, buttonAuto: cc.Node, buttonSpeed: cc.Node, buttonStop: cc.Node, reels: { default: [], type: o }, font: cc.BitmapFont, bet: cc.Node, notice: cc.Node, card: cc.Prefab, cardf: cc.Prefab, phien: cc.Label, hu: cc.Label, cuoc: "", isAuto: !1, isSpeed: !1, isSpin: !1 },
            init: function(t) { this.RedT = t, this.Top = t.Dialog.MiniPoker_Top, this.LichSu = t.Dialog.MiniPoker_LichSu, cc.RedT.setting.minipoker = cc.RedT.setting.minipoker || { scale: 1, bet: this.cuoc }, this.node.runScale = !1, this.card.data.getComponent("Card").config(), "true" == localStorage.getItem("minipoker") && (this.node.active = !0), void 0 === cc.RedT.util.fontEffect && (cc.RedT.util.fontEffect = this.font), void 0 !== cc.RedT.setting.minipoker.position && (this.node.position = cc.RedT.setting.minipoker.position), void 0 !== cc.RedT.setting.minipoker.bet && cc.RedT.setting.minipoker.bet != this.cuoc && this.intChangerBet(), void 0 !== cc.RedT.setting.minipoker.isSpeed && this.isSpeed != cc.RedT.setting.minipoker.isSpeed && this.onClickSpeed(), void 0 !== cc.RedT.setting.minipoker.isAuto && this.isAuto != cc.RedT.setting.minipoker.isAuto && this.onClickAuto() },
            onLoad: function() {
                var t = this;
                this.data = null, this.ttOffset = null, this.reels.forEach(function(e) { e.init(t) })
            },
            onEnable: function() { this.onGetHu(), this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this), this.onCloseGame() },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.minipoker.position = this.node.position },
            openGame: function() { cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("minipoker", !0), this.setTop()) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { cc.RedT.audio.playUnClick(), this.node.active = !1, localStorage.setItem("minipoker", !1) },
            random: function(t) { void 0 === t && (t = !1), this.reels.forEach(function(e) { e.random(t) }) },
            autoSpin: function() { this.random(), this.reels.forEach(function(t, e) { t.spin(e) }) },
            onSpin: function() { this.buttonSpin.pauseSystemEvents(), this.bet.children.forEach(function(t) { t.pauseSystemEvents() }) },
            offSpin: function() { this.isSpin = !1, this.buttonStop.active = !!this.isSpin && !!this.isAuto, this.buttonSpin.resumeSystemEvents(), this.bet.children.forEach(function(t) { t.children[0].active && t.resumeSystemEvents() }) },
            spin: function(t) { this.isSpin || (this.isSpin = !0, this.onSpin(), this.onGetSpin()) },
            onClickSpeed: function() { this.isSpeed = cc.RedT.setting.minipoker.isSpeed = !this.isSpeed, this.buttonSpeed.color = this.isSpeed ? cc.Color.WHITE : cc.color(136, 136, 136) },
            onClickAuto: function() { this.isAuto = cc.RedT.setting.minipoker.isAuto = !this.isAuto, this.buttonAuto.color = this.isAuto ? cc.Color.WHITE : cc.color(136, 136, 136), this.buttonStop.active = !!this.isSpin && !!this.isAuto },
            onClickStop: function() { this.onClickAuto(), this.buttonStop.active = !1 },
            intChangerBet: function() { this.bet.children.forEach(function(t) { t.name === cc.RedT.setting.minipoker.bet ? (this.cuoc = t.name, t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }.bind(this)) },
            changerBet: function(t, e) { this.cuoc = cc.RedT.setting.minipoker.bet = t.target.name, this.bet.children.forEach(function(t) { t.name === this.cuoc ? (t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents()) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents()) }.bind(this)), this.onGetHu() },
            speed: function() { return this.isSpeed ? 1.2 : 2.5 },
            onData: function(t) {
                var e = this;
                void 0 !== t.status && (1 === t.status ? (this.buttonStop.active = !!this.isAuto, this.win = t.win, this.winT = t.text, this.winC = t.code, t.card.forEach(function(t, i) { e.reels[i].card[0].spriteFrame = cc.RedT.util.card.getCard(t.card, t.type) }), this.autoSpin()) : this.offSpin()), void 0 !== t.phien && (this.phien.string = "#" + t.phien), void 0 !== t.log && this.LichSu.onData(t.log), void 0 !== t.top && this.Top.onData(t.top), void 0 !== t.notice && this.addNotice(t.notice)
            },
            addNotice: function(t) {
                var e = cc.instantiate(this.RedT.prefabMiniNotice);
                e.getComponent("mini_warning").text.string = t, this.notice.addChild(e)
            },
            setTop: function() { cc.RedT.setting.minipoker.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            hieuUng: function() {
                if (this.win > 0) {
                    if (2 === this.winC) {
                        1 == this.isAuto && this.onClickStop();
                        var t = cc.instantiate(this.RedT.PrefabNoHu),
                            e = (t = t.getComponent(cc.Animation)).node.children[6].getComponent(cc.Label);
                        this.RedT.nodeEfect.addChild(t.node), t.on("play", function() {
                            var i = cc.callFunc(function() { cc.RedT.audio.playEf("winHu"), n.numberTo(e, 0, this.win, 1e3, !0) }, this);
                            t.node.runAction(cc.sequence(cc.delayTime(.25), i))
                        }, this), t.on("finished", function() { t.node.destroy(), this.hieuUng() }, this), t.play()
                    } else if (1 === this.winC) {
                        var i = cc.instantiate(this.RedT.prefabBigWin);
                        (i = i.getComponent(cc.Animation)).on("finished", function() { i.node.destroy(), this.hieuUng() }, this), i.node.bet = this.win, i.node.position = cc.v2(0, 80), this.notice.addChild(i.node), this.win = 0
                    } else {
                        var o = new cc.Node;
                        o.addComponent(cc.Label), (o = o.getComponent(cc.Label)).string = "+" + n.numberWithCommas(this.win), o.font = cc.RedT.util.fontCong, o.lineHeight = 130, o.fontSize = 20, this.notice.addChild(o.node), o.node.runAction(cc.sequence(cc.moveTo(this.isSpeed ? 2 : 3.5, cc.v2(0, 140)), cc.callFunc(function() { o.node.destroy(), this.hieuUng() }, this))), this.addNotice(this.winT), this.win = 0
                    }
                    this.winC = 0
                } else this.isAuto ? this.timeOut = setTimeout(function() { this.onGetSpin() }.bind(this), this.isSpeed ? 250 : 1e3) : this.offSpin()
            },
            onGetHu: function() {
                if (this.node.active && void 0 !== cc.RedT.setting.topHu.data) {
                    var t = cc.RedT.setting.topHu.data.mini_poker.filter(function(t) { return t.type == this.cuoc }.bind(this)),
                        e = n.getOnlyNumberInString(this.hu.string),
                        i = t[0].bet;
                    e - i != 0 && n.numberTo(this.hu, e, i, 2e3, !0)
                }
            },
            onGetSpin: function() { cc.RedT.send({ g: { mini_poker: { spin: { cuoc: this.cuoc } } } }) },
            onCloseGame: function() { this.isSpin = !1, this.reels.forEach(function(t) { t.stop() }), this.offSpin(), void 0 !== this.timeOut && clearTimeout(this.timeOut) }
        }), cc._RF.pop()
    }, { Helper: "Helper", MiniPoker_reel: "MiniPoker_reel" }],
    MoMoPay: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "8d935U7N6hEPbsEdL0GxgiL", "MoMoPay");
        var n = function(t) { return t && t.__esModule ? t : { default: t } }(t("../../../../Util/Http"));
        var o = t("BrowserUtil"),
            c = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { labelNumber: cc.Label, labelName: cc.Label, labelNickname: cc.Label, isLoad: !1, inputTien: cc.EditBox, codeNode: cc.Node, lableCode: cc.Label, remainTime: cc.Label, btnCreateCode: cc.Node, btnCancelCode: cc.Node, hinhThuc: "", valueBank: "", chargeId: "" },
            onLoad: function() {
                var t = this;
                this.editboxs = [this.inputTien], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.isTop() && t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (o.focusGame(), t.onNapClick(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            callCreateCode: function() {
                var t = this;
                cc.RedT.inGame.loading.active = !0;
                var e = c.getOnlyNumberInString(this.inputTien.string),
                    i = cc.RedT.user.id;
                n.default.get("https://api.zon.vin/autocode/createCode/", { UID: i, chargeType: "momo", amount: e }, function(e, i) { cc.RedT.inGame.loading.active = !1, null == e && (1 == i.stt ? t.showCodeData(i.data) : -1 == i.stt ? cc.RedT.inGame.notice.show({ title: "MOMO PAY", text: "Kh\xf4ng t\xecm th\u1ea5y th\xf4ng tin t\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n \n Vui l\xf2ng c\u1eadp nh\u1eadp version m\u1edbi" }) : cc.RedT.inGame.notice.show({ title: "MOMO PAY", text: "MoMo pay l\u1ed7i ho\u1eb7c vui l\xf2ng ch\u1ecdn ng\xe2n h\xe0ng kh\xe1c" })) })
            },
            callCancelCode: function() {
                var t = this;
                cc.RedT.inGame.loading.active = !0, n.default.get("https://api.zon.vin/autocode/cancelCode/", { id: this.chargeId }, function(e, i) { cc.RedT.inGame.loading.active = !1, null == e && (1 == i.stt ? (t.expireCodeData(), cc.RedT.inGame.notice.show({ title: "N\u1ea0P ZON", text: "B\u1ea1n \u0111\xe3 hu\u1ef7 l\u1ec7nh n\u1ea1p th\xe0nh c\xf4ng" })) : cc.RedT.inGame.notice.show({ title: "MOMO PAY", text: "MoMo pay l\u1ed7i ho\u1eb7c vui l\xf2ng th\u1eed l\u1ea1i" })) })
            },
            onEnable: function() { "" != this.chargeId && this.expireCodeData(), cc.sys.isBrowser && this.addEvent() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean() },
            showCodeData: function(t) { this.codeNode.active = !0, this.lableCode.string = t.code, this.labelNickname.string = t.code, this.labelName.string = t.phoneName, this.labelNumber.string = t.phoneNum, this.btnCreateCode.active = !1, this.btnCancelCode.active = !0, this.chargeId = t.id, this.progressCountdown(t.timeToExpired) },
            expireCodeData: function() { this.codeNode.active = !1, this.lableCode.string = "-", this.labelNickname.string = "-", this.labelName.string = "H\xe3y t\u1ea1o code", this.labelNumber.string = "H\xe3y t\u1ea1o code", this.btnCreateCode.active = !0, this.btnCancelCode.active = !1, this.remainTime.string = "\u0110\xe3 h\u1ebft h\u1ea1n", this.chargeId = "" },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) o.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) o.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onNapClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (o.checkEditBoxFocus(this.editboxs[e])) { o.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && o.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.isLoad = !1 },
            toggleMoreBank: function() { "" != this.chargeId ? cc.RedT.inGame.notice.show({ title: "N\u1ea0P MOMO", text: "H\xe3y ho\xe0n th\xe0nh m\xe3 l\u1ec7nh b\u1ea1n \u0111\xe3 t\u1ea1o \n ho\u1eb7c hu\u1ef7 m\xe3 \u0111\u1ec3 t\u1ea1o l\u1ec7nh m\u1edbi" }) : this.moreBank.active = !this.moreBank.active },
            onData: function(t) {},
            onChangerRed: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                t = c.numberWithCommas(c.getOnlyNumberInString(t)), this.inputTien.string = 0 == t ? "" : t
            },
            onClickNap: function() { c.getOnlyNumberInString(this.inputTien.string) >> 0 < 5e4 ? cc.RedT.inGame.notice.show({ title: "N\u1ea0P MOMO", text: "N\u1ea1p t\u1ed1i thi\u1ec3u 50.000, t\u1ed1i \u0111a 1.000.000.000" }) : this.callCreateCode() },
            onCopyNumber: function() { cc.RedT.CopyToClipboard(this.labelNumber.string), cc.RedT.inGame.noticeCopy() },
            onCopyName: function() { cc.RedT.CopyToClipboard(this.labelName.string), cc.RedT.inGame.noticeCopy() },
            onCopyBranch: function() { cc.RedT.CopyToClipboard(this.labelBranch.string), cc.RedT.inGame.noticeCopy() },
            onCopyNoiDung: function() { cc.RedT.CopyToClipboard(this.labelNickname.string), cc.RedT.inGame.noticeCopy() },
            fancyTimeFormat: function(t) {
                var e = ~~(t / 3600),
                    i = ~~(t % 3600 / 60),
                    n = ~~t % 60,
                    o = "";
                return e > 0 && (o += e + ":" + (i < 10 ? "0" : "")), o += i + ":" + (n < 10 ? "0" : ""), o += "" + n
            },
            progressCountdown: function(t) { var e = this; return new Promise(function(i, n) { var o = setInterval(function() { t--, e.remainTime.string = e.fancyTimeFormat(t), t <= 0 && (e.expireCodeData(), clearInterval(o), i(!0)) }, 1e3) }) }
        }), cc._RF.pop()
    }, { "../../../../Util/Http": "Http", BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    NapRed_itemOne: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3bf1do9lYJMTYqfuawCCr7t", "NapRed_itemOne"), cc.Class({ extends: cc.Component, properties: { background: { default: null, type: cc.Node }, text: { default: null, type: cc.Label } }, init: function(t, e, i, n) { void 0 === n && (n = null), this.controll = t, this.local_arg = e, this.local_text = i, null !== n && (this.local_click = n) }, onClickChanger: function() { cc.RedT.audio.playClick(), this.controll[this.local_text].string = this.text.string, this.controll[this.local_arg].forEach(function(t) { t === this ? t.onSelect() : t.unSelect() }.bind(this)), this.controll.backT && this.controll.backT(this.data), void 0 !== this.local_click && this.controll[this.local_click](this) }, onSelect: function() { this.background.active = !0, this.node.pauseSystemEvents() }, unSelect: function() { this.background.active = !1, this.node.resumeSystemEvents() } }), cc._RF.pop()
    }, {}],
    NapRed_itemTT: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "692acli1tBGMJGB7Xh9IFJc", "NapRed_itemTT"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, menhgia: cc.Label, red: cc.Label }, init: function(t, e) { this.menhgia.string = t, this.red.string = e } }), cc._RF.pop()
    }, {}],
    NapRed: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "41eebjrhpBCuYVy5G92Kdy9", "NapRed");
        var n = t("NapThe");
        cc.Class({
            extends: cc.Component,
            properties: { NapThe: n, nodeNapThe: cc.Node, isLoaded: !1 },
            init: function() { this.NapThe.init(), this.nodeNapThe.active = !0 },
            onEnable: function() { this.onBackHinhThuc(), this.isLoaded || cc.RedT.send({ shop: { info_nap: !0 } }) },
            onDisable: function() {},
            onData: function(t) { void 0 === t.info || this.isLoaded || (this.isLoaded = !0, void 0 !== t.info.nhamang && this.NapThe.infoSet(t.info.nhamang, "nhamangList", "NhanhMang", !0), void 0 !== t.info.menhgia && this.NapThe.infoSet(t.info.menhgia, "menhgiaList", "MenhGia")) },
            onSelecHinhThuc: function(t) {
                var e = t.target.name.toLowerCase();
                if ("momo" == e) this.nodeNapThe.active = !1;
                else {
                    this.nodeNapThe.active = !0;
                    var i = this.NapThe.scrollviewNhaMang.content.children.filter(function(t) { var i = t.getComponent("NapRed_itemOne").text.string.toLowerCase(); return e == i });
                    if (i.length) {
                        var n = i[0].getComponent("NapRed_itemOne");
                        e = n.text.string, this.NapThe.nhamangList.forEach(function(t) { t === n ? t.onSelect() : t.unSelect() })
                    }
                    this.NapThe.NhanhMang.string = e
                }
            },
            onBackHinhThuc: function(t) {},
            onCopyNumber: function() { cc.RedT.CopyToClipboard(this.momoSTK.string), cc.RedT.inGame.noticeCopy() },
            onCopyName: function() { cc.RedT.CopyToClipboard(cc.RedT.user.name), cc.RedT.inGame.noticeCopy() }
        }), cc._RF.pop()
    }, { NapThe: "NapThe" }],
    NapThe: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7de7cl1cylKKYoILmVbposx", "NapThe");
        var n = t("BrowserUtil"),
            o = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { body: cc.Node, NhanhMang: { default: null, type: cc.Label }, MenhGia: { default: null, type: cc.Label }, SoThe: { default: null, type: cc.EditBox }, SoSeri: { default: null, type: cc.EditBox }, moreNhaMang: cc.Node, moreMenhGia: cc.Node, scrollviewNhaMang: { default: null, type: cc.ScrollView }, scrollviewMenhGia: { default: null, type: cc.ScrollView }, bangGia: { default: null, type: cc.ScrollView }, prefabLeft: { default: null, type: cc.Prefab }, prefabRight: { default: null, type: cc.Prefab }, captcha: { default: null, type: cc.EditBox }, capchaSprite: cc.Sprite },
            init: function() { this.editboxs = [this.SoThe, this.SoSeri, this.captcha], this.keyHandle = function(t) { return t.keyCode === cc.macro.KEY.tab ? (this.isTop() && this.changeNextFocusEditBox(), t.preventDefault && t.preventDefault(), !1) : t.keyCode === cc.macro.KEY.enter ? (n.focusGame(), this.onNapClick(), t.preventDefault && t.preventDefault(), !1) : void 0 }.bind(this) },
            onEnable: function() { cc.sys.isBrowser && this.addEvent(), this.reCaptcha() },
            onDisable: function() { this.moreNhaMang.active = this.moreMenhGia.active = !1, cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onNapClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !(this.moreNhaMang.active || this.moreMenhGia.active || cc.RedT.inGame.notice.node.active || cc.RedT.inGame.loading.active) },
            clean: function() { this.SoThe.string = this.SoSeri.string = this.captcha.string = "" },
            onNapClick: function() { this.SoThe.string.length < 11 || this.SoSeri.string.length < 11 ? cc.RedT.inGame.notice.show({ title: "N\u1ea0P RED", text: "Th\xf4ng Tin kh\xf4ng h\u1ee3p l\u1ec7..." }) : o.isEmpty(this.captcha.string) ? cc.RedT.inGame.notice.show({ title: "N\u1ea0P RED", text: "Vui l\xf2ng nh\u1eadp ch\xednh x\xe1c m\xe3 x\xe1c nh\u1eadn." }) : (cc.RedT.inGame.bgLoading.onData({ active: !0, text: "\u0110ang g\u1eedi d\u1eef li\u1ec7u..." }), cc.RedT.send({ shop: { nap_the: { nhamang: this.NhanhMang.string, menhgia: o.getOnlyNumberInString(this.MenhGia.string), mathe: this.SoThe.string, seri: this.SoSeri.string, captcha: this.captcha.string } } })) },
            onSelectHead: function(t, e) { this.header.forEach(function(t) { t.node.name === e ? t.select() : t.unselect() }), this.body.children.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 }) },
            toggleMoreNhaMang: function() { this.moreNhaMang.active = !this.moreNhaMang.active, this.moreMenhGia.active = !1 },
            toggleMoreMenhGia: function() { this.moreMenhGia.active = !this.moreMenhGia.active },
            backT: function() { this.moreNhaMang.active = !1, this.moreMenhGia.active = !1 },
            infoSet: function(t, e, i, n) {
                void 0 === n && (n = !1), t.length > 0 && (this[e] = t.map(function(t, c) {
                    var s = cc.instantiate(this.prefabLeft),
                        a = s.getComponent("NapRed_itemOne");
                    if (a.init(this, e, i), n) 0 == c && (a.background.active = !0, this.NhanhMang.string = t.name), a.text.string = t.name, this.scrollviewNhaMang.content.addChild(s);
                    else {
                        var h = o.numberWithCommas(t.name),
                            r = o.numberWithCommas(t.values);
                        0 == c && (a.background.active = !0, this.MenhGia.string = h), a.text.string = h, this.scrollviewMenhGia.content.addChild(s);
                        var d = cc.instantiate(this.prefabRight);
                        (d = d.getComponent("NapRed_itemTT")).init(h, r), d.bg.active = c % 2, this.bangGia.content.addChild(d.node)
                    }
                    return a
                }.bind(this)))
            },
            initCaptcha: function(t) {
                var e = this,
                    i = new Image;
                i.src = t, i.width = 150, i.height = 50, setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(i), t.handleLoadedTexture();
                    var n = new cc.SpriteFrame(t);
                    e.capchaSprite.spriteFrame = n
                }, 10)
            },
            reCaptcha: function() { cc.RedT.send({ captcha: "chargeCard" }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    NewsContents: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "359e3FxWmpPGarLjvZuJIkS", "NewsContents");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { prefabItem: cc.Prefab },
            init: function(t) { this.RedT = t },
            update: function(t) { this.node.position = cc.v2(this.node.position.x - 160 * t, 0), -this.node.width > this.node.position.x && this.reset() },
            setNews: function() { this.node.active = !0, this.node.position = cc.v2(this.RedT.node.width + 200, 0) },
            reset: function() { this.node.destroyAllChildren(), this.node.active = !1 },
            onData: function(t) { void 0 !== t.a && this.NewsAddArray(t.a), void 0 !== t.t && this.NewsAddText(t.t) },
            NewsAddArray: function(t) {
                var e = this,
                    i = this;
                Promise.all(t.map(function(t) { var e = cc.instantiate(i.prefabItem); return (e = e.getComponent("NewsItem")).users.string = t.users, e.bet.string = n.numberWithCommas(t.bet), e.game.string = t.game, i.node.addChild(e.node), e })).then(function(t) { e.node.active || e.setNews() })
            },
            NewsAddText: function(t) {
                var e = cc.instantiate(this.prefabItem);
                e = e.getComponent("NewsItem"), t.status && (e.status.node.active = !0, 1 == t.status ? (e.status.string = "(N\u1ed5 H\u0169)", e.win.string = "n\u1ed5 h\u0169") : e.status.string = "(Th\u1eafng L\u1edbn)"), e.users.string = t.users, e.bet.string = n.numberWithCommas(t.bet), e.game.string = t.game, this.node.addChild(e.node), this.node.active || this.setNews()
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    NewsItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ed1c0NxAXlNI4ktSR1Kq45Q", "NewsItem"), cc.Class({ extends: cc.Component, properties: { status: cc.Label, users: cc.Label, win: cc.Label, bet: cc.Label, game: cc.Label } }), cc._RF.pop()
    }, {}],
    Notice: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "55b77gHOPlJAY+OiMpR3w95", "Notice"), cc.Class({
            extends: cc.Component,
            properties: { nodeButton: { default: null, type: cc.Node }, title: { default: null, type: cc.Label }, text: { default: null, type: cc.Label }, button: { default: null, type: cc.Label } },
            onDisable: function() { this.clean() },
            show: function(t) { this.node.active = !0, void 0 !== t.load && (cc.RedT.inGame.loading.active = !1), void 0 !== t.title && (this.title.string = t.title), void 0 !== t.text && (this.text.string = t.text), void 0 !== t.button ? (this.text.node.y = 8, this.type = t.button.type, this.nodeButton.active = !0) : (this.nodeButton.active = !1, this.text.node.y = -14) },
            close: function() { cc.RedT.audio.playUnClick(), this.node.active = !1 },
            onClickButton: function() {
                switch (cc.RedT.audio.playClick(), this.type) {
                    case "sign_out":
                        this.node.active = !1, cc.RedT.send({ user: { signOut: !0 } }), cc.RedT.inGame.resetAuth(), setTimeout(function() { cc.RedT._socket.close() }, 100);
                        break;
                    case "reg_otp":
                        this.node.active = !1, null != cc.RedT.inGame.dialog.objShow && (cc.RedT.inGame.dialog.profile.node.previous = cc.RedT.inGame.dialog.objShow, cc.RedT.inGame.dialog.objShow.active = !1), cc.RedT.inGame.dialog.showProfile(null, "BaoMat"), cc.RedT.inGame.dialog.profile.BaoMat.onSelectHead(null, "DangKyOTP")
                }
            },
            clean: function() { this.title.string = this.text.string = this.button.string = "" }
        }), cc._RF.pop()
    }, {}],
    Pagination_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7edb4K7i4tECqx8snl3/cVz", "Pagination_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, bg_select: cc.Node, number: cc.Label }, start: function() {} }), cc._RF.pop()
    }, {}],
    Pagination: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a2298FO/xFF7KY+FwgkX4E6", "Pagination"), cc.Class({
            extends: cc.Component,
            properties: { nodeFirst: cc.Node, nodePrevious: cc.Node, nodePage1: cc.Node, nodePage2: cc.Node, nodePage3: cc.Node, nodePage4: cc.Node, nodePage5: cc.Node, nodeNext: cc.Node, nodeLast: cc.Node, page: 1, kmess: 10, totall: 0 },
            init: function(t) { this.controll = t, this.objSelect = null, this.nodePage1 = this.nodePage1.getComponent("Pagination_item"), this.nodePage2 = this.nodePage2.getComponent("Pagination_item"), this.nodePage3 = this.nodePage3.getComponent("Pagination_item"), this.nodePage4 = this.nodePage4.getComponent("Pagination_item"), this.nodePage5 = this.nodePage5.getComponent("Pagination_item"), this.arrO = [this.nodePage1, this.nodePage2, this.nodePage3, this.nodePage4, this.nodePage5] },
            select: function(t) { t.number.string = this.page, t.bg.active = !1, t.bg_select.active = !0, this.objSelect = t, t.node.pauseSystemEvents() },
            unSelect: function(t, e) { t.number.string = e, t.number.node.color = cc.Color.WHITE, t.bg.active = !0, t.bg_select.active = !1, t.node.page = e, t.node.resumeSystemEvents() },
            onSet: function(t, e, i) {
                var n = this,
                    o = this;
                this.page = t, this.kmess = e, this.totall = i, this.totalPage = Math.ceil(this.totall / this.kmess), this.pageRed = this.totalPage - this.page, i > 0 ? (this.node.active = !0, Promise.all(this.arrO.map(function(t, e) { return o.totalPage > 4 ? t.node.active = !0 : e < o.totalPage ? t.node.active = !0 : t.node.active = !1, o.page > 2 ? o.nodeFirst.active = !0 : o.nodeFirst.active = !1, o.pageRed > 1 ? o.nodeLast.active = !0 : o.nodeLast.active = !1, o.page > 1 ? o.nodePrevious.active = !0 : o.nodePrevious.active = !1, o.pageRed > 0 ? o.nodeNext.active = !0 : o.nodeNext.active = !1, 0 == e && 1 == o.page ? o.select(t) : 1 == e && 2 == o.page ? o.select(t) : 2 == e && (3 == o.page || o.totalPage > 5 && 1 !== o.page && 2 !== o.page && o.totalPage - 2 >= o.page) ? o.select(t) : 3 == e && (4 == o.totalPage && 4 == o.page || o.totalPage > 4 && o.totalPage - 1 == o.page) ? o.select(t) : 4 == e && o.totalPage > 4 && o.page == o.totalPage ? o.select(t) : void 0 })).then(function(t) { Promise.all(n.arrO.map(function(t, e) { t !== o.objSelect && (0 == e ? "page2" == o.objSelect.node.name ? o.unSelect(t, o.objSelect.number.string - 1) : "page3" == o.objSelect.node.name ? o.unSelect(t, o.objSelect.number.string - 2) : "page4" == o.objSelect.node.name ? o.unSelect(t, o.objSelect.number.string - 3) : "page5" == o.objSelect.node.name && o.unSelect(t, o.objSelect.number.string - 4) : 1 == e ? "page1" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 1) : "page3" == o.objSelect.node.name ? o.unSelect(t, o.objSelect.number.string - 1) : "page4" == o.objSelect.node.name ? o.unSelect(t, o.objSelect.number.string - 2) : "page5" == o.objSelect.node.name && o.unSelect(t, o.objSelect.number.string - 3) : 2 == e ? "page1" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 2) : "page2" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 1) : "page4" == o.objSelect.node.name ? o.unSelect(t, o.objSelect.number.string - 1) : "page5" == o.objSelect.node.name && o.unSelect(t, o.objSelect.number.string - 2) : 3 == e ? "page1" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 3) : "page2" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 2) : "page3" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 1) : "page5" == o.objSelect.node.name && o.unSelect(t, o.objSelect.number.string - 1) : 4 == e && ("page1" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 4) : "page2" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 3) : "page3" == o.objSelect.node.name ? o.unSelect(t, 1 * o.objSelect.number.string + 2) : "page4" == o.objSelect.node.name && o.unSelect(t, 1 * o.objSelect.number.string + 1))) })) })) : this.node.active = !1
            },
            onClickFirst: function() { this.controll.get_data(), cc.RedT.audio.playClick() },
            onClickPrevious: function() {
                var t = this.objSelect.number.string - 1;
                t > 0 && this.controll.get_data(t), cc.RedT.audio.playClick()
            },
            onClickPage: function(t) { this.controll.get_data(t.target.page), cc.RedT.audio.playClick() },
            onClickNext: function() {
                var t = 1 * this.objSelect.number.string + 1;
                t <= Math.ceil(this.totall / this.kmess) && this.controll.get_data(t), cc.RedT.audio.playClick()
            },
            onClickLast: function() { this.controll.get_data(Math.ceil(this.totall / this.kmess)), cc.RedT.audio.playClick() }
        }), cc._RF.pop()
    }, {}],
    PokerNapGame: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f8412okzzBPWojLjt3H0Peh", "PokerNapGame");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { touch: cc.Node, mask: cc.Node, toggle: cc.Toggle, labelBet: cc.Label, labelMin: cc.Label, labelMax: cc.Label, min: "", max: "" },
            init: function(t) { this.betMin = t * this.min, this.betMax = t * this.max, this.h = this.betMin < 1e6 ? 1e3 : 1e6, this.labelMin.string = this.labelBet.string = n.numberWithCommas(this.betMin), this.labelMax.string = n.numberWithCommas(this.betMax), this.betMin = this.betMin / this.h, this.betMax = this.betMax / this.h, this.toggle.isChecked = !0 },
            onEnable: function() { this.touch.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this) },
            onDisable: function() { this.touch.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this) },
            eventStart: function(t) { this.touch.runAction(cc.scaleTo(.1, .7)), this.offsetX = { localX: t.touch.getLocationX(), x: this.touch.position.x } },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.offsetX.localX + this.offsetX.x;
                e < 0 ? e = 0 : e > 401 && (e = 401), this.mask.width = e, this.touch.position = cc.v2(e, 0);
                var i = e / 401 * (this.betMax - this.betMin) + this.betMin >> 0;
                this.labelBet.string = n.numberWithCommas(i * this.h)
            },
            eventEnd: function() { this.touch.runAction(cc.scaleTo(.1, .6)) },
            onOkClick: function() { cc.RedT.inGame.loading.active = !0, cc.RedT.send({ g: { poker: { nap: { balans: n.getOnlyNumberInString(this.labelBet.string), auto: this.toggle.isChecked } } } }) },
            onCancelClick: function() { this.node.active = !1 }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    PokerNap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "24228zvZANA9qgncMTCgU85", "PokerNap");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { touch: cc.Node, mask: cc.Node, toggle: cc.Toggle, labelBet: cc.Label, labelMin: cc.Label, labelMax: cc.Label, min: "", max: "" },
            init: function(t) { this.RedT = t, this.betMin = t.bet * this.min, this.betMax = t.bet * this.max, this.h = this.betMin < 1e6 ? 1e3 : 1e6, this.labelMin.string = this.labelBet.string = n.numberWithCommas(this.betMin), this.labelMax.string = n.numberWithCommas(this.betMax), this.betMin = this.betMin / this.h, this.betMax = this.betMax / this.h, this.toggle.isChecked = !0 },
            onEnable: function() { this.node.runAction(cc.RedT.inGame.dialog.actionShow), this.touch.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this) },
            onDisable: function() { cc.RedT.inGame.dialog.resetSizeDialog(this.node), this.touch.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.mask.width = 0, this.touch.position = cc.v2(0, 0) },
            eventStart: function(t) { this.touch.runAction(cc.scaleTo(.1, .7)), this.offsetX = { localX: t.touch.getLocationX(), x: this.touch.position.x } },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.offsetX.localX + this.offsetX.x;
                e < 0 ? e = 0 : e > 401 && (e = 401), this.mask.width = e, this.touch.position = cc.v2(e, 0);
                var i = e / 401 * (this.betMax - this.betMin) + this.betMin >> 0;
                this.labelBet.string = n.numberWithCommas(i * this.h)
            },
            eventEnd: function() { this.touch.runAction(cc.scaleTo(.1, .6)) },
            onOkClick: function() { cc.RedT.inGame.loading.active = !0, cc.RedT.send({ g: { poker: { reg: { room: this.RedT.bet, balans: n.getOnlyNumberInString(this.labelBet.string), auto: this.toggle.isChecked } } } }) },
            onCancelClick: function() { cc.RedT.inGame.dialog.onClickBack() }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    PokerTo: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b065113djNNPr4/ETwvQMGU", "PokerTo");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { touch: cc.Node, mask: cc.Node, labelBet: cc.Label, labelMin: cc.Label, labelMax: cc.Label },
            onEnable: function() {
                var t = cc.RedT.inGame.player[cc.RedT.inGame.meMap],
                    e = n.getOnlyNumberInString(cc.RedT.inGame.mainBet.string),
                    i = n.getOnlyNumberInString(t.bet.string),
                    o = n.getOnlyNumberInString(t.balans.string),
                    c = e - i;
                if (this.betMax = o - c, this.betMax < 1) return this.node.active = !1, void(cc.RedT.inGame.btm_to.active = !1);
                var s = n.getOnlyNumberInString(cc.RedT.inGame.labelRoom.string);
                this.betMin = s >> 0, this.h = this.betMin <= 100 ? 50 : this.betMin <= 1e3 ? 500 : this.betMin <= 1e4 ? 1e3 : this.betMin <= 1e5 ? 1e4 : 1e6, this.labelMin.string = this.labelBet.string = n.numberWithCommas(this.betMin), this.labelMax.string = n.numberWithCommas(this.betMax), this.betMin = this.betMin / this.h, this.betMax = this.betMax / this.h, this.touch.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this)
            },
            onDisable: function() { this.touch.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.touch.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.touch.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.touch.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.mask.height = 0, this.touch.position = cc.v2(0, 0) },
            eventStart: function(t) { this.touch.runAction(cc.scaleTo(.1, 1.18)), this.offsetY = { localY: t.touch.getLocationY(), y: this.touch.position.y } },
            eventMove: function(t) {
                var e = t.touch.getLocationY() - this.offsetY.localY + this.offsetY.y;
                e < 0 ? e = 0 : e > 287 && (e = 287), this.mask.height = e, this.touch.position = cc.v2(0, e);
                var i = e / 287 * (this.betMax - this.betMin) + this.betMin >> 0;
                this.labelBet.string = n.numberWithCommas(i * this.h)
            },
            eventEnd: function() { this.touch.runAction(cc.scaleTo(.1, 1)) },
            onOkClick: function() { cc.RedT.send({ g: { poker: { to: n.getOnlyNumberInString(this.labelBet.string) } } }) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Poker_Player: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "02e31t62CZAeZeJI+3SSL8m", "Poker_Player");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { nickname: cc.Label, balans: cc.Label, bet: cc.Label, card: cc.Node, status: cc.Node, notice: cc.Node, bgWin: cc.Node, Progress: cc.ProgressBar, Avatar: cc.Sprite, titleCard: cc.Sprite, item: { default: [], type: cc.Sprite }, isOpen: !1 },
            init: function() { this.isAll = !1, this.isHuy = !1, this.item.forEach(function(t, e) { this["item" + e] = { position: t.node.position, angle: t.node.angle } }.bind(this)) },
            ChiaBai: function(t, e, i) {
                var n = this.item[e],
                    o = cc.RedT.inGame;
                if (t.data) {
                    var c = t.data[e],
                        s = o.bo_bai.parent.convertToWorldSpaceAR(o.bo_bai.position);
                    n.node.position = n.node.parent.convertToNodeSpaceAR(s), n.node.scaleX = o.bo_bai.width / n.node.width, n.node.scaleY = o.bo_bai.height / n.node.height, n.node.angle = 0, n.node.active = !0, n.spriteFrame = cc.RedT.util.card.cardB1, n.node.runAction(cc.sequence(cc.delayTime(i), cc.spawn(cc.moveTo(.1, this["item" + e].position), cc.rotateTo(.1, this["item" + e].angle), cc.scaleTo(.1, 1)), cc.delayTime(.1), cc.scaleTo(.1, 0, 1), cc.callFunc(function() { this.spriteFrame = cc.RedT.util.card.getCard(c.card, c.type), this.bai = c, c = null }, n), cc.scaleTo(.1, 1, 1)))
                } else {
                    n.spriteFrame = cc.RedT.util.card.cardB1;
                    var a = o.bo_bai.parent.convertToWorldSpaceAR(o.bo_bai.position);
                    n.node.position = n.node.parent.convertToNodeSpaceAR(a), n.node.scaleX = o.bo_bai.width / n.node.width, n.node.scaleY = o.bo_bai.height / n.node.height, n.node.angle = 0, n.node.active = !0, n.node.runAction(cc.sequence(cc.delayTime(i), cc.spawn(cc.moveTo(.1, this["item" + e].position), cc.rotateTo(.1, this["item" + e].angle), cc.scaleTo(.1, 1))))
                }
            },
            openCard: function(t) {
                this.item.forEach(function(e, i) {
                    var n = t[i];
                    e.node.runAction(cc.sequence(cc.scaleTo(.1, 0, 1), cc.callFunc(function() { this.spriteFrame = cc.RedT.util.card.getCard(n.card, n.type), this.bai = n, n = null }, e), cc.scaleTo(.1, 1, 1)))
                })
            },
            setAvatar: function(t) { t >>= 0, void 0 !== cc.RedT.avatars[t] ? this.Avatar.spriteFrame = cc.RedT.avatars[t] : this.Avatar.spriteFrame = cc.RedT.avatars[0] },
            setInfo: function(t, e) { void 0 === e && (e = !1), t ? (this.node.active = !0, void 0 !== t.balans && (e ? this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() { this.balans.string = n.numberWithCommas(t.balans), t = null }, this))) : this.balans.string = n.numberWithCommas(t.balans)), t.name && (this.nickname.string = t.name), t.progress && this.startProgress(t.progress), void 0 !== t.bet && (this.bet.string = n.numberWithCommas(t.bet)), void 0 !== t.openCard && cc.RedT.inGame.player[cc.RedT.inGame.meMap] !== this && this.openCard(t.openCard), void 0 !== t.avatar && this.setAvatar(t.avatar)) : (this.resetGame(), this.node.active = !1) },
            infoGame: function(t, e) {
                if (void 0 === e && (e = !1), void 0 !== t.nap && (t.nap = t.nap >> 0, t.nap > 0 && this.noticeBet(t.nap, "+", 2.5, 22, cc.RedT.inGame.font1)), void 0 !== t.hoa && (this.miniStatus(cc.RedT.inGame.spriteHoa), t.hoa = t.hoa >> 0, t.hoa > 0 && this.noticeBet(t.hoa, "+", 3.5, 22, cc.RedT.inGame.font1)), void 0 !== t.to && (this.miniStatus(cc.RedT.inGame.spriteCuoc), t.to = t.to >> 0, t.to > 0 && this.noticeBet(t.to, "+", 2.5, 22, cc.RedT.inGame.font1)), void 0 !== t.win && this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() { this.status.destroyAllChildren(), t.win = t.win >> 0, t.win > 0 && this.noticeBet(t.win, "+", 3.5, 28, cc.RedT.inGame.font1), this.bgWin.active = !0, t = null }, this))), void 0 !== t.lost && this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() { this.miniStatus(cc.RedT.inGame.spriteLost), t.lost = t.lost >> 0, t.lost > 0 && this.noticeBet(t.lost, "-", 3.5, 22, cc.RedT.inGame.font2), t = null }, this))), void 0 !== t.theo && (this.miniStatus(cc.RedT.inGame.spriteTheo), t.theo = t.theo >> 0, t.theo > 0 && this.noticeBet(t.theo, "+", 2.5, 22, cc.RedT.inGame.font1)), void 0 !== t.xem && (this.miniStatus(cc.RedT.inGame.spriteXem), t.xem = t.xem >> 0, t.xem > 0 && this.noticeBet(t.xem, "+", 2.5, 22, cc.RedT.inGame.font1)), void 0 !== t.huy) {
                    if (this.isHuy = !0, cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this) {
                        this.status.destroyAllChildren();
                        var i = new cc.Node;
                        (i = i.addComponent(cc.Sprite)).spriteFrame = cc.RedT.inGame.spriteHuy, this.status.addChild(i.node), i.node.opacity = 50, i.node.scale = 3, i.node.y = cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this ? 52 : 33, i.node.runAction(cc.sequence(cc.spawn(cc.fadeTo(.1, 255), cc.scaleTo(.1, 1)), cc.delayTime(2.5)))
                    } else this.miniStatus(cc.RedT.inGame.spriteHuy);
                    this.item.forEach(function(t) { t.node.color = t.node.color.fromHEX("999999") })
                }
                void 0 !== t.all && (this.isAll = !0, this.miniStatus(cc.RedT.inGame.spriteAll), t.all = t.all >> 0, t.all > 0 && this.noticeBet(t.all, "+", 2.5, 25, cc.RedT.inGame.font1))
            },
            miniStatus: function(t) {
                this.status.destroyAllChildren();
                var e = new cc.Node;
                (e = e.addComponent(cc.Sprite)).spriteFrame = t, this.status.addChild(e.node), e.node.opacity = 50, e.node.scale = 3, e.node.y = cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this ? 52 : 33, e.node.runAction(cc.sequence(cc.spawn(cc.fadeTo(.1, 255), cc.scaleTo(.1, 1)), cc.delayTime(2.5), cc.callFunc(function() { this.destroy() }, e.node)))
            },
            startProgress: function(t) { this.Progress.progress = 0, this.progressTime = t, this.oldTime = (new Date).getTime(), this.isUpdate = !0 },
            setProgress: function(t, e) { this.Progress.progress = e, this.progressTime = t, this.oldTime = (new Date).getTime(), this.isUpdate = !0 },
            resetGame: function() { this.item.forEach(function(t) { t.node.color = t.node.color.fromHEX("FFFFFF"), t.node.active = !1, t.bai = null }), this.isAll = !1, this.isHuy = !1, this.resetStatus(), this.bgWin.active = !1, this.bet.string = "", this.isOpen = !1, this.titleCard.node.active = !1 },
            resetStatus: function(t) { void 0 === t && (t = !1), this.status.destroyAllChildren(), this.notice.destroyAllChildren() },
            noticeBet: function(t, e, i, o, c) {
                var s = new cc.Node;
                s.addComponent(cc.Label), (s = s.getComponent(cc.Label)).string = e + n.numberWithCommas(t), s.font = c, s.lineHeight = 40, s.fontSize = o, s.spacingX = -4, this.notice.addChild(s.node);
                var a = 100,
                    h = 0 == e.length ? 0 : "+" == e ? -8 : -3;
                cc.RedT.inGame.player[cc.RedT.inGame.meMap] === this && (h = 0 == e.length ? 0 : "+" == e ? -8 : -4, a = 126), s.node.runAction(cc.sequence(cc.moveTo(.2, cc.v2(h, a)), cc.delayTime(i), cc.callFunc(function() { this.destroy() }, s.node)))
            },
            update: function(t) {
                if (!0 === this.isUpdate) {
                    var e = ((new Date).getTime() - this.oldTime) / 1e3 / this.progressTime;
                    this.Progress.progress = e + t / this.progressTime, this.Progress.progress >= 1 && (this.Progress.progress = 0, this.progressTime = 0, this.isUpdate = !1)
                }
            },
            viewCard: function() { 1 == cc.RedT.user.rights && (this.isOpen ? (this.isOpen = !1, this.item.forEach(function(t) { t.spriteFrame = cc.RedT.util.card.cardB1 })) : cc.RedT.send({ g: { poker: { card: this.map } } })) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Poker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "33055XFpShOdKT1xWNnrtNQ", "Poker");
        var n = t("Helper"),
            o = t("Notice"),
            c = t("Poker_Player"),
            s = t("PokerNapGame");
        cc.Class({
            extends: cc.Component,
            properties: { player_nap: s, font1: cc.BitmapFont, font2: cc.BitmapFont, nodeNotice: cc.Node, prefabNotice: cc.Prefab, loading: cc.Node, redhat: cc.Node, bo_bai: cc.Node, nodeout: cc.Node, notice: o, player: { default: [], type: c }, labelRoom: cc.Label, mainBet: cc.Label, labelTimeStart: cc.Label, roomCard: cc.Node, prefabCard: cc.Node, botton: cc.Node, btm_bo: cc.Node, btm_xem: cc.Node, btm_theo: cc.Node, btm_to: cc.Node, btm_all: cc.Node, nodePanelCardMain: cc.Node, nodeBTNPane: cc.Node, nodeTo: cc.Node, spriteAll: cc.SpriteFrame, spriteHuy: cc.SpriteFrame, spriteTheo: cc.SpriteFrame, spriteXem: cc.SpriteFrame, spriteCuoc: cc.SpriteFrame, spriteWin: cc.SpriteFrame, spriteMeWin: cc.SpriteFrame, spriteLost: cc.SpriteFrame, spriteHoa: cc.SpriteFrame, titleCard: { default: [], type: cc.SpriteFrame }, panel: !1, dataOn: !0 },
            onLoad: function() { cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat, this.game_player = null, cc.RedT.audio.bg.pause(), this.player.forEach(function(t) { t.init() }), this.redTcard = this.nodePanelCardMain.children.map(function(t) { return t.getComponent(cc.Sprite) }), cc.RedT.send({ scene: "poker", g: { poker: { ingame: !0 } } }), this.timeStop = 0, 1 == cc.RedT.user.rights && (this.nodeBTNPane.active = !0) },
            onData: function(t) { t.mini && cc.RedT.MiniPanel.onData(t.mini), t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu), t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp), void 0 !== t.user && cc.RedT.userData(t.user), this.dataOn && (t.viewCard && this.viewCard(t.viewCard), t.mainCard && this.viewMainCard(t.mainCard), t.meMap && (this.meMap = t.meMap), t.infoGhe && this.infoGhe(t.infoGhe), t.infoRoom && this.infoRoom(t.infoRoom), t.ingame && this.ingame(t.ingame), t.outgame && this.outgame(t.outgame), t.game && this.game(t.game), t.kick && this.kick(), void 0 !== t.notice && this.notice.show(t.notice), void 0 !== t.load && (this.loading.active = t.load), void 0 !== t.nap && (this.player_nap.node.active = t.nap)) },
            gameStart: function(t) { t.forEach(function(t) { this.player[t.ghe].setInfo(t.data) }.bind(this)) },
            gamePlayer: function(t) {
                var e = this.player[t.ghe];
                void 0 !== t.data && e.setInfo(t.data), void 0 !== t.info && e.infoGame(t.info)
            },
            resetGame: function() { this.timeStop = 0, this.mainBet.string = "", this.roomCard.destroyAllChildren(), this.nodeNotice.destroyAllChildren(), Object.values(this.player).forEach(function(t) { t.resetGame() }) },
            gameInfo: function(t) {
                t.data.forEach(function(e) {
                    var i = this.player[e.ghe];
                    void 0 !== e.data && i.setInfo(e.data, !!t.win), void 0 !== e.info && i.infoGame(e.info)
                }.bind(this)), t.win && this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                    Object.values(this.player).forEach(function(t) { t.item.forEach(function(t) { t.node.color = t.node.color.fromHEX("999999") }) }), this.roomCard.children.forEach(function(e) { e.children[0].color = e.children[0].color.fromHEX("999999"), t.win.bo.forEach(function(t) { e.card.card == t.card && e.card.type == t.type && (e.children[0].color = e.children[0].color.fromHEX("FFFFFF")) }) });
                    var e = this.player[t.win.ghe];
                    e.item.forEach(function(e) { e.bai && t.win.bo.forEach(function(t) { e.bai.card == t.card && e.bai.type == t.type && (e.node.color = e.node.color.fromHEX("FFFFFF")) }) }), 2 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[0]) : 3 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[1]) : 4 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[2]) : 5 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[3]) : 6 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[4]) : 7 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[5]) : 8 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[6]) : 9 == t.win.code ? (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[7]) : 10 == t.win.code && (e.titleCard.node.active = !0, e.titleCard.spriteFrame = this.titleCard[8])
                }, this)))
            },
            gameStop: function() { this.offSelect(), this.labelTimeStart.string = "", this.labelTimeStart.node.active = !1, clearInterval(this.regTime1), this.timeStop = (new Date).getTime() },
            offSelect: function() { this.game_player && (this.game_player.isUpdate = !1, this.game_player.progressTime = 0, this.game_player.Progress.progress = 0), this.botton.active = !1, this.nodeTo.active = !1 },
            game: function(t) { t.start && this.gameStart(t.start), t.stop && this.gameStop(), t.finish && this.gameStop(), t.chia_bai && this.ChiaBai(t.chia_bai), t.turn && this.LuotChoi(t.turn), t.info && this.gameInfo(t.info), t.player && this.gamePlayer(t.player), t.offD, void 0 !== t.offSelect && this.offSelect(), t.card && this.mainCard(t.card) },
            LuotChoi: function(t) {
                var e = this.player[t.ghe];
                this.game_player && (this.game_player.isUpdate = !1, this.game_player.progressTime = 0, this.game_player.Progress.progress = 0), this.game_player = e, e.startProgress(t.progress), void 0 !== t.select ? (this.botton.active = !0, t.select.xem ? this.btm_xem.active = !0 : this.btm_xem.active = !1, t.select.theo ? this.btm_theo.active = !0 : this.btm_theo.active = !1, t.select.to ? this.btm_to.active = !0 : this.btm_to.active = !1, t.select.all ? this.btm_all.active = !0 : this.btm_all.active = !1) : (this.botton.active = !1, this.nodeTo.active = !1)
            },
            mainCard: function(t) {
                var e = .1,
                    i = this.bo_bai.parent.convertToWorldSpaceAR(this.bo_bai.position);
                t.forEach(function(t) {
                    var n = cc.instantiate(this.prefabCard);
                    this.roomCard.addChild(n);
                    var o = n.children[0].getComponent(cc.Sprite);
                    o.node.runAction(cc.sequence(cc.delayTime(e), cc.callFunc(function() { o.node.position = o.node.parent.convertToNodeSpaceAR(i), o.node.scaleX = this.bo_bai.width / o.node.width, o.node.scaleY = this.bo_bai.height / o.node.height, o.spriteFrame = cc.RedT.util.card.cardB1 }, this), cc.spawn(cc.moveTo(.1, cc.v2(0, 0)), cc.scaleTo(.1, 1)), cc.delayTime(.1), cc.scaleTo(.1, 0, 1), cc.callFunc(function() { o.spriteFrame = cc.RedT.util.card.getCard(t.card, t.type), n.card = t, o = null, t = null, n = null }, this), cc.scaleTo(.1, 1, 1))), e += .1
                }.bind(this))
            },
            ChiaBai: function(t) { for (var e = this, i = 0, n = function(n) { t.forEach(function(t) { this.player[t.id].ChiaBai(t, n, i), i += .05 }.bind(e)) }, o = 0; o < 2; o++) n(o) },
            infoGhe: function(t) {
                var e = {},
                    i = [];
                if (1 != this.meMap) {
                    var n = this.meMap - 1;
                    i = i.concat(t.slice(n), t.slice(0, n))
                } else i = t;
                i.forEach(function(t, i) {
                    var n = this.player[i];
                    n.map = t.ghe, e[t.ghe] = n, n.setInfo(t.data)
                }.bind(this)), this.player = e, e = null, i = null
            },
            infoRoom: function(t) {
                void 0 !== t.game && (this.labelRoom.string = n.numberWithCommas(t.game), this.player_nap.init(t.game)), void 0 !== t.bet && (this.mainBet.string = n.numberWithCommas(t.bet)), void 0 !== t.isStop && (this.labelTimeStart.node.active = !1, clearInterval(this.regTime1)), 1 == t.isPlay && void 0 !== t.time_start && (this.resetGame(), this.time_start = t.time_start >> 0, this.labelTimeStart.node.active = !0, this.labelTimeStart.string = "", this.regTime1 = setInterval(function() { this.labelTimeStart.string = n.numberPad(this.time_start, 2), this.time_start < 0 && (this.labelTimeStart.node.active = !1, clearInterval(this.regTime1)), this.time_start-- }.bind(this), 1e3)), void 0 !== t.first && t.first.forEach(function(t) {
                    var e = this.player[t.id];
                    e.noticeBet(t.bet, "", 2, 22, cc.RedT.inGame.font1), e.bet.string = n.numberWithCommas(t.bet)
                }.bind(this)), void 0 !== t.card && t.card.forEach(function(t) {
                    var e = this.player[t.ghe];
                    cc.RedT.inGame.player[cc.RedT.inGame.meMap] !== e && e.item.forEach(function(t) { t.node.active = !0, t.spriteFrame = cc.RedT.util.card.cardB1 })
                }.bind(this))
            },
            ingame: function(t) { this.player[t.ghe].setInfo(t.data) },
            outgame: function(t) { this.player[t].setInfo(null) },
            kick: function() { cc.RedT.MiniPanel.node.parent = null, this.dataOn = !1, this.loading.active = !0, clearInterval(this.regTime1), cc.director.loadScene("MainGame") },
            backGame: function() { cc.RedT.MiniPanel.node.parent = null, this.dataOn = !1, cc.RedT.send({ g: { poker: { outgame: !0 } } }), this.loading.active = !0, clearInterval(this.regTime1), cc.director.loadScene("MainGame") },
            signOut: function() { cc.RedT.MiniPanel.node.parent = null, this.dataOn = !1, clearInterval(this.regTime1), cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            onSelect: function(t, e) { cc.RedT.send({ g: { poker: { select: e } } }) },
            toggleTo: function() { this.nodeTo.active = !this.nodeTo.active },
            toggleNap: function() { this.player_nap.node.active = !this.player_nap.node.active },
            toggleOut: function() { this.nodeout.active = !this.nodeout.active },
            togglePanel: function() { this.panel ? (this.panel = !1, this.nodePanelCardMain.active = !1) : (cc.RedT.send({ g: { poker: { maincard: !0 } } }), this.nodePanelCardMain.active = !0, this.panel = !0) },
            viewCard: function(t) {
                var e = this.player[t.map];
                e && t.card && 2 == t.card.length && (e.isOpen = !0, e.item.forEach(function(e, i) {
                    var n = t.card[i];
                    e.spriteFrame = cc.RedT.util.card.getCard(n.card, n.type)
                }))
            },
            viewMainCard: function(t) {
                this.redTcard.forEach(function(e, i) {
                    var n = t[i];
                    n && (e.spriteFrame = cc.RedT.util.card.getCard(n.card, n.type))
                })
            },
            update: function() {
                if (0 != this.timeStop) {
                    var t = (new Date).getTime();
                    (t -= this.timeStop) >= 8e3 && (this.timeStop = 0, this.resetGame())
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper", Notice: "Notice", PokerNapGame: "PokerNapGame", Poker_Player: "Poker_Player" }],
    Profile: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d8d00YWIWBCb7SVNiYpGTax", "Profile"), cc.Class({ extends: cc.Component, properties: { header: cc.Node, CaNhan: cc.Node, KetSat: cc.Node, BaoMat: cc.Node, LichSu: cc.Node, ThongKe: cc.Node }, init: function() { this.CaNhan = this.CaNhan.getComponent("CaNhan"), this.KetSat = this.KetSat.getComponent("KetSat"), this.BaoMat = this.BaoMat.getComponent("BaoMat"), this.LichSu = this.LichSu.getComponent("LichSu"), this.ThongKe = this.ThongKe.getComponent("ThongKe"), this.CaNhan.init(), this.KetSat.init(), this.BaoMat.init(), this.body = [this.CaNhan, this.KetSat, this.BaoMat, this.LichSu, this.ThongKe], this.header = this.header.children.map(function(t) { return t.getComponent("itemHeadMenu") }) }, onSelectHead: function(t, e) { this.header.forEach(function(t) { t.node.name == e ? t.select() : t.unselect() }), this.body.forEach(function(t) { t.node.name == e ? t.node.active = !0 : t.node.active = !1 }) }, superView: function(t) { "CaNhan" == t ? this.onSelectHead(null, "CaNhan") : "KetSat" == t ? this.onSelectHead(null, "KetSat") : "BaoMat" == t ? this.onSelectHead(null, "BaoMat") : "LichSu" == t && this.onSelectHead(null, "LichSu") }, onData: function(t) { void 0 !== t.history && this.LichSu.onData(t.history), void 0 !== t.the_cao && cc.RedT.inGame.dialog.the_cao.onData(t.the_cao), t.level } }), cc._RF.pop()
    }, {}],
    PushNohu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0faf5dS7zpEdoBIck7+SPhQ", "PushNohu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { prefab: cc.Prefab, isPush: !1 },
            onLoad: function() { this.list = [] },
            pushNotice: function() {
                if (this.list.length > 0) {
                    this.isPush = !0;
                    var t = this.list[0];
                    this.addNotice(t), this.list.splice(0, 1)
                } else this.isPush = !1
            },
            onData: function(t) { this.isPush ? this.list.push(t) : this.addNotice(t), this.isPush = !0, this.addNews(t) },
            addNotice: function(t) {
                var e;
                (e = (e = cc.instantiate(this.prefab)).getComponent("ThongBaoNoHu")).title.string = t.title, e.users.string = t.name, e.bet.string = n.numberWithCommas(t.bet), e.init(this), this.node.addChild(e.node)
            },
            addNews: function(t) { cc.RedT.inGame.newsContents.NewsAddText({ users: t.name, bet: t.bet, game: t.title, status: 1 }) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Settings: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "75587hPL3NPGadq3k5zgG80", "Settings");
        var n = t("CheckOut");
        cc.Class({ extends: cc.Component, properties: { NhacNen: n, NhacGame: n }, onLoad: function() { cc.RedT.isSoundBackground() || this.NhacNen.OnChangerClick(), cc.RedT.isSoundGame() || this.NhacGame.OnChangerClick() }, onEnable: function() { this.node.runAction(cc.RedT.inGame.dialog.actionShow) }, onDisable: function() { cc.RedT.inGame.dialog.resetSizeDialog(this.node) }, setMusic: function() { null == localStorage.getItem("SOUND_GAME") ? cc.RedT.setSoundGame(!0) : cc.RedT.isSoundGame() ? cc.RedT.IS_SOUND = !0 : cc.RedT.IS_SOUND = !1 }, OnChangerNhacNen: function() { cc.RedT.setSoundBackground(this.NhacNen.isChecked), this.NhacNen.isChecked ? cc.RedT.audio.bg.play() : cc.RedT.audio.bg.stop() }, OnChangerNhacGame: function() { cc.RedT.setSoundGame(this.NhacGame.isChecked), this.NhacGame.isChecked ? cc.RedT.IS_SOUND = !0 : cc.RedT.IS_SOUND = !1 }, OnSignOutClick: function() { cc.RedT.inGame.notice.show({ title: "\u0110\u0102NG XU\u1ea4T", text: "X\xe1c nh\u1eadn h\xe0nh \u0111\u1ed9ng.\nH\xe0nh \u0111\u1ed9ng th\u1ef1c hi\u1ec7n \u0111\u0103ng xu\u1ea5t kh\u1ecfi t\xe0i kho\u1ea3n n\xe0y?", button: { type: "sign_out", text: "\u0110\u0102NG XU\u1ea4T" } }) } }), cc._RF.pop()
    }, { CheckOut: "CheckOut" }],
    Shop: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7c3a2CceMBL14CXynIjq7O1", "Shop");
        var n = t("bankNap"),
            o = t("bankRut");
        cc.Class({ extends: cc.Component, properties: { header: cc.Node, NapRed: cc.Node, TieuRed: cc.Node, ChuyenRed: cc.Node, DaiLy: cc.Node, Banknap: n, BankRut: o }, init: function() { this.NapRed = this.NapRed.getComponent("NapRed"), this.TieuRed = this.TieuRed.getComponent("TieuRed"), this.ChuyenRed = this.ChuyenRed.getComponent("ChuyenRed"), this.DaiLy = this.DaiLy.getComponent("DaiLy"), this.NapRed.init(), this.TieuRed.init(), this.ChuyenRed.init(this), this.BankRut.init(), this.DaiLy.init(this), this.body = [this.NapRed, this.TieuRed, this.ChuyenRed, this.DaiLy, this.Banknap, this.BankRut], this.header = this.header.children.map(function(t) { return t.getComponent("itemHeadMenu") }) }, onSelectHead: function(t, e) { this.header.forEach(function(t) { t.node.name === e ? t.select() : t.unselect() }), this.body.forEach(function(t) { t.node.name === e ? t.node.active = !0 : t.node.active = !1 }) }, superView: function(t) { "NapRed" == t ? this.onSelectHead(null, "NapRed") : "TieuRed" == t || "MuaTheNap" == t ? (this.onSelectHead(null, "TieuRed"), "TieuRed" != t && this.TieuRed.onSelectHead(null, t)) : "ChuyenRed" == t ? this.onSelectHead(null, "ChuyenRed") : "DaiLy" == t ? this.onSelectHead(null, "DaiLy") : "BankRut" == t ? this.onSelectHead(null, "BankRut") : "BankNap" == t && this.onSelectHead(null, "BankNap") }, onData: function(t) { void 0 !== t.nap_red && this.NapRed.onData(t.nap_red), void 0 !== t.mua_the_nap && this.TieuRed.MuaTheCao.onData(t.mua_the_nap), void 0 !== t.daily && this.DaiLy.onData(t.daily), t.bank && (t.bank.list && this.Banknap.onData(t.bank.list), t.bank.info && this.Banknap.setInfo(t.bank.info)) } }), cc._RF.pop()
    }, { bankNap: "bankNap", bankRut: "bankRut" }],
    SignIn: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1c678NmitZCp6ybtgqTKrnQ", "SignIn");
        var n = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { username: cc.EditBox, password: cc.EditBox, captcha: cc.EditBox, capchaSprite: cc.Sprite, btnSavePass: cc.Toggle },
            onLoad: function() {
                var t = this;
                this.yName = this.username.node.y, this.yPass = this.password.node.y, this.editboxs = [this.username, this.password], this.editboxs_i = 0, this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onLoginClick(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.escape ? (cc.RedT.inGame.dialog.onClickBack(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() {
                var t = cc.sys.localStorage.getItem("username"),
                    e = cc.sys.localStorage.getItem("password"),
                    i = cc.sys.localStorage.getItem("Save_User");
                null == i ? (cc.sys.localStorage.setItem("Save_User", !1), this.btnSavePass.isChecked) : "true" === i && t && e && (this.username.string = t, this.password.string = e, this.btnSavePass.isChecked = !0), cc.sys.isBrowser && this.addEvent(), this.node.runAction(cc.RedT.inGame.dialog.actionShow)
            },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean(), cc.RedT.inGame.dialog.resetSizeDialog(this.node) },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.escape:
                        this.isTop() && cc.RedT.inGame.dialog.onClickBack();
                        break;
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onLoginClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.username.node.y = this.yName, this.password.node.y = this.yPass, this.username.string = this.password.string = "", this.captcha.node.active = !1 },
            Luumatkhau: function() {
                var t = cc.sys.localStorage.getItem("Save_User"),
                    e = null;
                "false" === t ? "" == this.username.string || "" == this.password.string ? e = "B\u1ea1n ch\u01b0a nh\u1eadp t\xe0i kho\u1ea3n, m\u1eadt kh\u1ea9u" : (cc.sys.localStorage.setItem("Save_User", !0), this.btnSavePass.isChecked = !0, cc.sys.localStorage.setItem("username", this.username.string), cc.sys.localStorage.setItem("password", this.password.string)) : "true" === t && (cc.sys.localStorage.setItem("Save_User", !1), cc.sys.localStorage.removeItem("username"), cc.sys.localStorage.removeItem("password"), this.btnSavePass.isChecked = !1), e && cc.RedT.inGame.notice.show({ title: "\u0110\u0102NG NH\u1eacP", text: e })
            },
            onLoginClick: function() { this.username.string.length > 32 || this.username.string.length < 3 || null === this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) ? cc.RedT.inGame.notice.show({ title: "\u0110\u0102NG NH\u1eacP", text: "T\xean t\xe0i kho\u1ea3n kh\xf4ng \u0111\xfang!!" }) : this.password.string.length > 32 || this.password.string.length < 6 ? cc.RedT.inGame.notice.show({ title: "\u0110\u0102NG NH\u1eacP", text: "M\u1eadt kh\u1ea9u kh\xf4ng \u0111\xfang!!" }) : !0 === this.captcha.node.active ? this.captcha.string.length > 6 || this.captcha.string.length < 4 ? cc.RedT.inGame.notice.show({ title: "\u0110\u0102NG NH\u1eacP", text: "Captcha kh\xf4ng \u0111\xfang!!" }) : cc.RedT.inGame.auth({ authentication: { username: this.username.string, password: this.password.string, captcha: this.captcha.string } }) : cc.RedT.inGame.auth({ authentication: { username: this.username.string, password: this.password.string } }) },
            initCaptcha: function(t) {
                this.username.node.y = this.yName + 45, this.password.node.y = this.yPass + 52, this.captcha.node.active = !0;
                var e = new Image;
                e.src = t, e.width = 150, e.height = 50, setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(e), t.handleLoadedTexture();
                    var i = new cc.SpriteFrame(t);
                    this.capchaSprite.spriteFrame = i
                }.bind(this), 10)
            },
            reCaptcha: function() { cc.RedT.send({ captcha: "signIn" }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil" }],
    SignName: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "428fapqUBNMxZBikn0+ylYv", "SignName");
        var n = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { username: { default: null, type: cc.EditBox } },
            onLoad: function() {
                var t = this;
                this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onSignNameClick(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), n.getHTMLElementByEditBox(this.username).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() { n.getHTMLElementByEditBox(this.username).removeEventListener("keydown", this.keyHandle, !1), cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this) },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onSignNameClick()
                }
            },
            changeNextFocusEditBox: function() { n.focusEditBox(this.username) },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.username.string = "" },
            onSignNameClick: function() { this.username.string.length > 16 || this.username.string.length < 6 || null === this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) ? cc.RedT.inGame.notice.show({ title: "", text: "T\xean Nh\xe2n v\u1eadt t\u1eeb 6 \u0111\u1ebfn 16 k\xfd t\u1ef1 v\xe0 kh\xf4ng ch\u1ee9a k\xfd t\u1ef1 \u0111\u1eb7c bi\u1ec7t!!" }) : cc.RedT.send({ signName: this.username.string }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil" }],
    SignUp: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0dcbdkfFWFJo7s1gZAEcYsa", "SignUp");
        var n = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { username: { default: null, type: cc.EditBox }, password: { default: null, type: cc.EditBox }, repassword: { default: null, type: cc.EditBox }, captcha: { default: null, type: cc.EditBox }, capchaSprite: cc.Sprite },
            onLoad: function() {
                var t = this;
                this.editboxs = [this.username, this.password, this.repassword, this.captcha], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onSignUpClick(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.escape ? (cc.RedT.inGame.dialog.onClickBack(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent(), this.node.runAction(cc.RedT.inGame.dialog.actionShow), this.reCaptcha() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean(), cc.RedT.inGame.dialog.resetSizeDialog(this.node) },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.escape:
                        this.isTop() && cc.RedT.inGame.dialog.onClickBack();
                        break;
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onSignUpClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.username.string = this.password.string = this.repassword.string = this.captcha.string = "" },
            onSignUpClick: function() {
                var t = null;
                this.username.string.length > 32 || this.username.string.length < 3 ? t = "\u0110\u1ed9 d\xe0i T\xean t\xe0i kho\u1ea3n 3 - 32 k\xfd t\u1ef1!!" : this.password.string.length > 32 || this.password.string.length < 6 ? t = "\u0110\u1ed9 d\xe0i m\u1eadt kh\u1ea9u 6 - 32 k\xfd t\u1ef1!!" : this.password.string !== this.repassword.string ? t = "X\xe1c nh\u1eadn m\u1eadt kh\u1ea9u kh\xf4ng kh\u1edbp!" : this.captcha.string.length < 4 ? t = "Vui l\xf2ng nh\u1eadp Captcha." : this.username.string == this.password.string ? t = "T\xe0i kho\u1ea3n kh\xf4ng \u0111\u01b0\u1ee3c tr\xf9ng v\u1edbi m\u1eadt kh\u1ea9u!!" : null === this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) && (t = "T\xean ch\u1ec9 g\u1ed3m Ch\u1eef v\xe0 S\u1ed1!"), t ? cc.RedT.inGame.notice.show({ title: "\u0110\u0102NG K\xdd", text: t }) : cc.RedT.inGame.auth({ authentication: { username: this.username.string, password: this.password.string, register: !0, captcha: this.captcha.string } })
            },
            initCaptcha: function(t) {
                var e = this,
                    i = new Image;
                i.src = t, i.width = 150, i.height = 50, setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(i), t.handleLoadedTexture();
                    var n = new cc.SpriteFrame(t);
                    e.capchaSprite.spriteFrame = n
                }, 10)
            },
            reCaptcha: function() { cc.RedT.send({ captcha: "signUp" }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil" }],
    Splash: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "75b79AEMXNJqYRJtb538JJ4", "Splash"), cc.Class({
            extends: cc.Component,
            properties: { messageLabel: cc.Label, manifestUrl: { default: null, type: cc.Asset }, retryButtonNode: cc.Node, updateProgressBar: cc.Node, _am: null, _updating: !1, _canRetry: !1, _storagePath: "" },
            onLoad: function() { this.isLoadScene = !1, this.isLoadConfig = !1, this.initOneSign(), cc.sys.isBrowser ? this.loadAssets() : (this.initHotUpdate(), this.checkUpdate()) },
            initOneSign: function() { this.checkPlugin() && (sdkbox.PluginOneSignal.init(), sdkbox.PluginOneSignal.setListener({ onSendTag: function(t, e, i) {}, onGetTags: function(t) {}, onIdsAvailable: function(t, e) {}, onPostNotification: function(t, e) {}, onNotification: function(t, e, i) {} })) },
            checkPlugin: function() { return "undefined" == typeof sdkbox ? (console.log("sdkbox is undefined"), !1) : void 0 !== sdkbox.PluginOneSignal || (console.log("sdkbox.PluginFacebook is undefined"), !1) },
            loadAssets: function() { this.updateProgress(0), this.messageLabel.string = "\u0110ang l\u1ea5y d\u1eef li\u1ec7u game ...", setTimeout(function() { this.loadScene() }.bind(this), 100) },
            loadScene: function() { cc.director.preloadScene("MainGame", this.onProgress.bind(this), this.onLoaded.bind(this)) },
            onProgress: function(t, e) {
                var i = t / e * 838 >> 0,
                    n = parseInt(t / e * 100);
                this.messageLabel.string = "\u0110ang t\u1ea3i " + n + "%", this.updateProgress(i)
            },
            onLoaded: function(t, e) { cc.director.loadScene("MainGame") },
            onDestroy: function() { this._updateListener && (this._am.setEventCallback(null), this._updateListener = null) },
            initHotUpdate: function() { this.updateProgress(0), this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "rvip-remote-asset", this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle), this._am.setVerifyCallback(function(t, e) { return e.compressed, !0 }.bind(this)), cc.sys.os === cc.sys.OS_ANDROID && this._am.setMaxConcurrentTask(2) },
            checkUpdate: function() { this._updating ? this.messageLabel.string = "\u0110ang ki\u1ec3m tra phi\xean b\u1ea3n ..." : (this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl.nativeUrl), this._am.setEventCallback(this.checkCb.bind(this)), this._am.checkUpdate(), this._updating = !0) },
            hotUpdate: function() { this._am && !this._updating && (this._am.setEventCallback(this.updateCb.bind(this)), this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl.nativeUrl), this._failCount = 0, this._am.update(), this._updating = !0) },
            retry: function() {!this._updating && this._canRetry && (this.retryButtonNode.active = !1, this._canRetry = !1, this.messageLabel.string = "Th\u1eed l\u1ea1i ...", this._am.downloadFailedAssets()) },
            checkCb: function(t) {
                var e = !1,
                    i = !1;
                switch (t.getEventCode()) {
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        this.messageLabel.string = "Kh\xf4ng t\xecm th\u1ea5y Hot Update ...";
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        this.messageLabel.string = "T\u1ea3i manifest th\u1ea5t b\u1ea1i ...";
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                        this.updateProgress(838), this.messageLabel.string = "Phi\xean b\u1ea3n m\u1edbi nh\u1ea5t ...", e = !0;
                        break;
                    case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                        this.messageLabel.string = "T\xecm th\u1ea5y phi\xean b\u1ea3n c\u1eadp nh\u1eadt ...", this.updateProgress(0), i = !0;
                        break;
                    default:
                        return
                }
                this._am.setEventCallback(null), this._checkListener = null, this._updating = !1, e && this.loadAssets(), i && this.hotUpdate()
            },
            updateCb: function(t) {
                var e = !1,
                    i = !1;
                switch (t.getEventCode()) {
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        this.messageLabel.string = "Kh\xf4ng t\xecm th\u1ea5y Hot Update ...", i = !0;
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        var n = 838 * t.getPercent();
                        this.updateProgress(n), this.messageLabel.string = "\u0110ang c\u1eadp nh\u1eadt ...";
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        this.messageLabel.string = "T\u1ea3i manifest th\u1ea5t b\u1ea1i ...", i = !0;
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                        this.updateProgress(838), this.messageLabel.string = "Phi\xean b\u1ea3n m\u1edbi nh\u1ea5t ...", i = !0;
                        break;
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        this.messageLabel.string = "C\u1eadp nh\u1eadt th\xe0nh c\xf4ng", e = !0;
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        this.messageLabel.string = "C\u1eadp nh\u1eadt th\u1ea5t b\u1ea1i", this.retryButtonNode.active = !0, this._updating = !1, this._canRetry = !0;
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        this.messageLabel.string = "C\u1eadp nh\u1eadt th\u1ea5t b\u1ea1i";
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        this.messageLabel.string = t.getMessage()
                }
                if (i && (this._am.setEventCallback(null), this._updateListener = null, this._updating = !1), e) {
                    this._am.setEventCallback(null), this._updateListener = null;
                    var o = jsb.fileUtils.getSearchPaths(),
                        c = this._am.getLocalManifest().getSearchPaths();
                    Array.prototype.unshift.apply(o, c), cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(o)), jsb.fileUtils.setSearchPaths(o), cc.audioEngine.stopAll(), cc.game.restart()
                }
            },
            onRetryClick: function() { this.retry() },
            versionCompareHandle: function(t, e) {
                console.log("JS Custom Version Compare: version A is " + t + ", version B is " + e), console.log("JS Custom Version Compare: version A is " + t + ", version B is " + e);
                for (var i = t.split("."), n = e.split("."), o = 0; o < i.length; ++o) {
                    var c = parseInt(i[o]),
                        s = parseInt(n[o] || 0);
                    if (c !== s) return c - s
                }
                return n.length > i.length ? -1 : 0
            },
            updateProgress: function(t) { this.updateProgressBar.width = t }
        }), cc._RF.pop()
    }, {}],
    TaiXiuBoard_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e6c11CHYW1PjZKvnSwp1SEF", "TaiXiuBoard_item"), cc.Class({ extends: cc.Component, properties: { colorOn: "", colorOff: "", bgOn: { default: null, type: cc.SpriteFrame }, bgOff: { default: null, type: cc.SpriteFrame }, text: { default: null, type: cc.Node } }, onLoad: function(t) { this.sprite = this.node.getComponent(cc.Sprite) }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.eventOnENTER, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.eventOnLEAVE, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.eventOnENTER, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.eventOnLEAVE, this) }, eventOnENTER: function() { this.text.color = this.text.color.fromHEX(this.colorOn), this.sprite.spriteFrame = this.bgOn }, eventOnLEAVE: function() { this.text.color = this.text.color.fromHEX(this.colorOff), this.sprite.spriteFrame = this.bgOff } }), cc._RF.pop()
    }, {}],
    TaiXiuBoard: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "71423kGPWNLUrUcOrvZ688E", "TaiXiuBoard");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { textType: { default: null, type: cc.Label }, nodeChonTien: { default: null, type: cc.Node }, nodeChonSo: { default: null, type: cc.Node } },
            init: function(t) { this.RedT = t },
            ChonTienClick: function(t, e) { this.RedT.input.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.RedT.input.string) + 1 * e) },
            ChonSoClick: function(t, e) { this.RedT.input.string = n.numberWithCommas(n.getOnlyNumberInString(this.RedT.input.string + e)) },
            onBackClick: function() {
                var t = n.getOnlyNumberInString(this.RedT.input.string);
                this.RedT.input.string = n.numberWithCommas(t.slice(0, t.length - 1))
            },
            onCleanClick: function() { this.RedT.input.string = "" },
            onAllClick: function() { this.RedT.input.string = n.numberWithCommas(cc.RedT.user.red) },
            onChangerTypeClick: function() { this.nodeChonTien.active ? (this.nodeChonTien.active = !1, this.nodeChonSo.active = !0, this.textType.string = "CH\u1eccN") : (this.nodeChonSo.active = !1, this.nodeChonTien.active = !0, this.textType.string = "S\u1ed0 KH\xc1C") },
            onCuocClick: function() { this.RedT.onCuocClick() },
            onCloseClick: function() { this.node.active = !1, this.RedT.input.string = this.RedT.RedT.board ? "" : "\u0110\u1eb7t c\u01b0\u1ee3c..." }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    TaiXiuChat: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e4b59QQx49GyaeME6czSwsj", "TaiXiuChat");
        var n = t("Helper"),
            o = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { content: { default: null, type: cc.ScrollView }, item: { default: null, type: cc.Prefab }, input: { default: null, type: cc.EditBox }, layout: { default: null, type: cc.Layout }, isLoad: !1 },
            init: function(t) { this.RedT = t, void 0 !== cc.RedT.setting.taixiu.chat_active && (this.node.active = cc.RedT.setting.taixiu.chat_active) },
            onLoad: function() {
                var t = this;
                this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (o.focusGame(), t.onChatClick(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent(), this.isLoad || this.getData() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { o.getHTMLElementByEditBox(this.input).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() { o.getHTMLElementByEditBox(this.input).removeEventListener("keydown", this.keyHandle, !1) },
            getData: function() { this.isLoad = !0, cc.RedT.send({ taixiu: { getLogChat: !0 } }) },
            message: function(t, e) {
                void 0 === e && (e = !1);
                var i = cc.instantiate(this.item);
                i.getComponent(cc.Label).string = t.user + ": " + t.value, i.children[0].getComponent(cc.Label).string = t.user, this.content.content.addChild(i), e && this.layout.node.height > 300 && this.layout.node.height - this.layout.node.position.y - 134 < 70 && setTimeout(function() { this.content.scrollToBottom(.1) }.bind(this), 100)
            },
            logs: function(t) {
                var e = this;
                if (t.length) {
                    var i = this;
                    Promise.all(t.map(function(t) { return i.message(t) })).then(function(t) { setTimeout(function() { this.content.scrollToBottom(.1) }.bind(e), 100) })
                }
            },
            onData: function(t) { void 0 !== t.message && this.message(t.message, !0), void 0 !== t.logs && this.logs(t.logs) },
            onChatClick: function() { n.isEmpty(this.input.string) ? this.RedT.onData({ err: "Nh\u1eadp n\u1ed9i dung \u0111\u1ec3 chat..." }) : (cc.RedT.send({ taixiu: { chat: this.input.string } }), this.onData({ message: { user: cc.RedT.user.name, value: this.input.string } }), this.clean()) },
            toggle: function() { this.RedT.setTop(), cc.RedT.audio.playClick(), this.node.active = cc.RedT.setting.taixiu.chat_active = !this.node.active },
            clean: function() { this.input.string = "" },
            reset: function() { this.content.content.destroyAllChildren(), this.node.active = !1 }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    TaiXiuLichSuPhien_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "47ebeX3OGJIioJo+XYY5AW7", "TaiXiuLichSuPhien_item"), cc.Class({ extends: cc.Component, properties: { time: { default: null, type: cc.Label }, user: { default: null, type: cc.Label }, cuoc: { default: null, type: cc.Label }, tralai: { default: null, type: cc.Label } } }), cc._RF.pop()
    }, {}],
    TaiXiuLichSuPhien: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "66490CKFvdK6JST1Zi6Whaj", "TaiXiuLichSuPhien");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { itemPrefab: { default: null, type: cc.Prefab }, dice: { default: [], type: cc.Sprite }, leftCuoc: { default: null, type: cc.Label }, leftTraLai: { default: null, type: cc.Label }, rightCuoc: { default: null, type: cc.Label }, rightTraLai: { default: null, type: cc.Label }, phien: { default: null, type: cc.Label }, nodeTai: { default: null, type: cc.Node }, nodeXiu: { default: null, type: cc.Node }, scrollViewLeft: { default: null, type: cc.ScrollView }, scrollViewRight: { default: null, type: cc.ScrollView }, nodeNext: { default: null, type: cc.Node }, nodePrevious: { default: null, type: cc.Node }, spacingY: 0 },
            init: function(t) { this.RedT = t, this.data = null, this.isLeftUpdating = !1, this.lastLeft = 0, this.isRightUpdating = !1, this.lastRight = 0 },
            onLoad: function() { this.scrollViewLeft.node.on("scroll-to-bottom", this.bootomLeft, this), this.scrollViewRight.node.on("scroll-to-bottom", this.bootomRight, this) },
            onGetPhienClick: function(t) { this.getPhien(t.target.phien) },
            getPhien: function(t) { void 0 === t && (t = null), t && (cc.RedT.inGame.loading.active = !0, cc.RedT.send({ taixiu: { get_phien: { phien: t } } }), this.lastLeft = this.lastRight = 0) },
            onNextClick: function(t) { this.getPhien(this.isPhien + 1) },
            onPreviousClick: function(t) { this.getPhien(this.isPhien - 1) },
            onData: function(t) {
                var e = this;
                this.setNew(), this.data = t, cc.RedT.inGame.loading.active = !1, cc.RedT.MiniPanel.Dialog.showTaiXiuLichSuPhien(), this.leftCuoc.string = n.numberWithCommas(t.tong_L), this.rightCuoc.string = n.numberWithCommas(t.tong_R), this.leftTraLai.string = n.numberWithCommas(t.tong_tralai_L), this.rightTraLai.string = n.numberWithCommas(t.tong_tralai_R), this.phien.string = t.phien + "  -  " + n.getStringDateByTime(t.time), this.isPhien = t.phien;
                var i = t.dice[0] + t.dice[1] + t.dice[2],
                    o = cc.RedT.setting.taixiu.logs[0].phien - t.phien;
                this.nodePrevious.active = !(o > 17), this.nodeNext.active = !(o < 1), this.dice.forEach(function(i, n) {
                    var o = t.dice[n];
                    i.spriteFrame = e.RedT.TX_Main.diceSF[o - 1]
                }), this.nodeTai.active = i > 10, this.nodeXiu.active = !(i > 10), this.loadLeftData(), this.loadRightData()
            },
            bootomLeft: function(t) { this.isLeftUpdating || this.loadLeftData() },
            bootomRight: function(t) { this.isRightUpdating || this.loadRightData() },
            loadLeftData: function() {
                var t = this.lastLeft;
                this.isLeftUpdating = !0;
                var e = t + 50;
                t >= this.data.dataL.length - 50 && (e = this.data.dataL.length);
                for (var i = t; i < e && void 0 !== this.data.dataL[i]; ++i) {
                    var o = this.data.dataL[i],
                        c = cc.instantiate(this.itemPrefab),
                        s = c.getComponent("TaiXiuLichSuPhien_item");
                    s.time.string = n.getStringHourByTime(o.time), s.user.string = o.name, s.cuoc.string = n.numberWithCommas(o.bet), s.tralai.string = n.numberWithCommas(o.tralai), this.scrollViewLeft.content.addChild(c)
                }
                this.isLeftUpdating = !1, this.lastLeft = e
            },
            loadRightData: function() {
                var t = this.lastRight;
                this.isRightUpdating = !0;
                var e = t + 50;
                t >= this.data.dataR.length - 50 && (e = this.data.dataR.length);
                for (var i = t; i < e && void 0 !== this.data.dataR[i]; ++i) {
                    var o = this.data.dataR[i],
                        c = cc.instantiate(this.itemPrefab),
                        s = c.getComponent("TaiXiuLichSuPhien_item");
                    s.time.string = n.getStringHourByTime(o.time), s.user.string = o.name, s.cuoc.string = n.numberWithCommas(o.bet), s.tralai.string = n.numberWithCommas(o.tralai), this.scrollViewRight.content.addChild(c)
                }
                this.isRightUpdating = !1, this.lastRight = e
            },
            setNew: function() { this.scrollViewLeft.content.destroyAllChildren(), this.scrollViewRight.content.destroyAllChildren() }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    TaiXiuLichSu_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "06a2bfDqLRFiorJC/4mw+4h", "TaiXiuLichSu_item"), cc.Class({ extends: cc.Component, properties: { phien: cc.Label, time: cc.Label, dat: cc.Label, cuoc: cc.Label, ketqua: cc.Label, tralai: cc.Label, nhan: cc.Label } }), cc._RF.pop()
    }, {}],
    TaiXiuLichSu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "80da9UrNe9D45tJEXBxj5Wd", "TaiXiuLichSu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node, page: cc.Prefab },
            init: function(t) { this.RedT = t },
            onLoad: function() { this.page = cc.instantiate(this.page), this.page.y = -250, this.node.addChild(this.page), this.page = this.page.getComponent("Pagination"), this.page.init(this), this.content = this.content.children.map(function(t) { return t.getComponent("TaiXiuLichSu_item") }) },
            onEnable: function() { this.get_data() },
            onDisable: function() {},
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ taixiu: { get_log: { page: t } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    if (void 0 !== o) {
                        e.node.active = !0;
                        var c = o.dice1 + o.dice2 + o.dice3;
                        e.phien.string = o.phien, e.time.string = n.getStringDateByTime(o.time), e.dat.string = o.taixiu ? o.select ? "Ch\u1eb5n" : "L\u1ebb" : o.select ? "T\xe0i" : "X\u1ec9u", e.cuoc.string = n.numberWithCommas(o.bet), e.ketqua.string = o.dice1 + "-" + o.dice2 + "-" + o.dice3 + "  " + c, e.tralai.string = n.numberWithCommas(o.tralai), e.nhan.string = n.numberWithCommas(o.betwin)
                    } else e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    TaiXiuMain_logTips: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "43178FyrtFOhKXVCK9EK0Dk", "TaiXiuMain_logTips"), cc.Class({ extends: cc.Component, properties: { text: { default: null, type: cc.Label }, tips: { default: null, type: cc.Node } }, onLoad: function() { this.sprite = this.getComponent(cc.Sprite) }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.eventOnENTER, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.eventOnLEAVE, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.eventOnENTER, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.eventOnLEAVE, this) }, eventOnENTER: function() { this.tips.active = !0 }, eventOnLEAVE: function() { this.tips.active = !1 } }), cc._RF.pop()
    }, {}],
    TaiXiuMain: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a1f5dGzy/ZDl7mqfiHNadfE", "TaiXiuMain");
        var n = t("TaiXiuBoard"),
            o = t("TaiXiuChat"),
            c = t("BrowserUtil"),
            s = t("Helper"),
            a = t("TaiXiu_money_efScale"),
            h = t("TaiXiu_efScale");
        cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, rongThan: sp.Skeleton, bg_Dice: cc.Animation, bg_efDice: cc.Node, inputL: cc.Node, inputR: cc.Node, inputLTxt: cc.Label, inputRTxt: cc.Label, inputLeft: cc.EditBox, inputRight: cc.EditBox, totalLeft: cc.Label, totalRight: cc.Label, myLeft: cc.Label, myRight: cc.Label, playerLeft: cc.Label, playerRight: cc.Label, nodeKetQua: cc.Node, labelKetQua: cc.Label, timeWait: cc.Label, nodeTimeWait: cc.Node, timeCuoc: cc.Label, timeCuocSp: sp.Skeleton, timePopup: cc.Label, nodeTimePopup: cc.Node, labelPhien: cc.Label, diaNan: cc.Node, dice: { default: [], type: cc.Sprite }, diceSF: { default: [], type: cc.SpriteFrame }, dotLogs: cc.Node, diceAnimation: cc.Animation, smokeAnimation: cc.Node, efTai: h, efTai_win: cc.Node, efXiu: h, efXiu_win: cc.Node, efMoneyTai: a, efMoneyXiu: a, frameNan: { default: [], type: cc.SpriteFrame }, spriteNan: cc.Sprite, dot_black: cc.SpriteFrame, dot_white: cc.SpriteFrame, dot_yellow: cc.SpriteFrame, notice: cc.Node, fontCong: cc.BitmapFont, fontTru: cc.BitmapFont, WIN_HT: cc.Label, WIN_DN: cc.Label, LOST_HT: cc.Label, LOST_DN: cc.Label, TX_Chat: o, TX_Board: n, taixiu: !0 },
            init: function(t) { this.RedT = t, cc.RedT.setting.taixiu.data = cc.RedT.setting.taixiu.data || { taixiu: {}, du_day: {} }, this.isNan = !1, void 0 === cc.RedT.util.fontCong && (cc.RedT.util.fontCong = this.fontCong, cc.RedT.util.fontTru = this.fontTru), void 0 === cc.RedT.setting.taixiu.getLogs && (cc.RedT.setting.taixiu.getLogs = !1), void 0 === cc.RedT.setting.taixiu.isNan && (cc.RedT.setting.taixiu.isNan = !1), this.dotLogs = this.dotLogs.children.map(function(t) { var e = t.getComponent(cc.Sprite); return e.mod = t.getComponent("TaiXiuMain_logTips"), e }), this.dotLogs.reverse(), this.onDiceAnimationFinish = function(t) { this.setDice(!0), this.isNan || (this.dataLogs(), this.nodeKetQua.active = !0, this.diemSo > 10 ? (this.efTai.play(), this.efTai_win.active = !0) : (this.efXiu.play(), this.efXiu_win.active = !0)), this.diceAnimation.node.active = !1, this.smokeAnimation.active = !1 }, void 0 !== cc.RedT.setting.taixiu.position && (this.node.position = cc.RedT.setting.taixiu.position), cc.RedT.setting.taixiu.getLogs && (void 0 !== cc.RedT.setting.taixiu.time_remain && (cc.RedT.setting.taixiu.time_remain++, this.nextRealTime()), this.reLoadGame()) },
            onLoad: function() {
                this.ttOffset = null, this.editboxs = [this.inputLeft, this.inputRight], this.TX_Board.init(this), this.TX_Chat.init(this), this.diaNan.getComponent("TaiXiu_DiaNan").init(this), this.keyHandle = function(t) { return t.keyCode === cc.macro.KEY.tab ? (this.changeNextFocusEditBox(), t.preventDefault && t.preventDefault(), !1) : t.keyCode === cc.macro.KEY.enter ? (c.focusGame(), this.onCuocClick(), t.preventDefault && t.preventDefault(), !1) : void 0 }, this.diceAnimation.on("finished", this.onDiceAnimationFinish, this), this.onCuocClick = function() {
                    var t = s.getOnlyNumberInString(this.input.string);
                    if (t = parseInt(t), this.RedT.board ? this.input.string = "" : this.input.string = "\u0110\u1eb7t c\u01b0\u1ee3c...", this.TX_Board.node.active = !1, isNaN(t) || t < 1e3) {
                        var e = cc.instantiate(this.RedT.RedT.prefabMiniNotice);
                        e.getComponent("mini_warning").text.string = "Ti\u1ec1n c\u01b0\u1ee3c ph\u1ea3i l\u1edbn h\u01a1n 1.000 BOP", this.notice.addChild(e)
                    } else cc.RedT.send({ taixiu: { cuoc: { select: "left" == this.inputOld, bet: t } } })
                }, this.RedT.board && (this.inputL.active = this.inputR.active = !1, this.inputLeft.node.active = this.inputRight.node.active = !0)
            },
            playRongThan: function() {},
            onEnable: function() { this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this), this.RedT.board && cc.sys.isBrowser && this.addEvent(), this.nodeTimePopup.active = !1, this.RedT.board && (c.inputAddEvent(this.inputLeft, "input", this.updateValue), c.inputAddEvent(this.inputRight, "input", this.updateValue)) },
            onDisable: function() { this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this), this.RedT.board && cc.sys.isBrowser && this.removeEvent(), this.clean(), cc.RedT.IS_LOGIN && (this.nodeTimePopup.active = !0), this.RedT.board && (c.inputRemoveEvent(this.inputLeft, "input", this.updateValue), c.inputRemoveEvent(this.inputRight, "input", this.updateValue)) },
            updateValue: function(t) {
                var e = s.numberWithCommas(s.getOnlyNumberInString(this.value));
                this.value = "0" == e ? "" : e
            },
            addEvent: function() { for (var t in this.editboxs) c.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle.bind(this), !1) },
            removeEvent: function() { for (var t in this.editboxs) c.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle.bind(this), !1) },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (c.checkEditBoxFocus(this.editboxs[e])) { c.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && c.focusEditBox(this.editboxs[1])
            },
            clean: function() { this.inputLeft.string = this.inputRight.string = "" },
            onChangerNan: function() { cc.RedT.setting.taixiu.isNan = this.isNan = !this.isNan, this.spriteNan.spriteFrame = this.isNan ? this.frameNan[1] : this.frameNan[0] },
            reLoadGame: function() { this.regTimeOut2 = setTimeout(function() { this.dataLogs(), cc.RedT.setting.taixiu.red != this.red && this.onChangerRED(), cc.RedT.setting.taixiu.taixiu != this.taixiu ? this.onChangerGame() : this.dataLogs(), cc.RedT.setting.taixiu.isNan != this.isNan && this.onChangerNan(), this.onDuDay(cc.RedT.setting.taixiu.data.du_day), cc.RedT.setting.taixiu.taixiu ? this.onDataTaiXiu(cc.RedT.setting.taixiu.data.taixiu) : this.onDataChanLe(cc.RedT.setting.taixiu.data.chanle) }.bind(this), 50), this.setPhien() },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.taixiu.position = this.node.position },
            setTop: function() { this.node.parent.insertChild(this.node), this.RedT.setTop() },
            onSelectInput: function(t, e) {
                switch (this.TX_Board.node.active = !0, this.inputOld = e, e) {
                    case "right":
                        this.input = this.RedT.board ? this.inputRight : this.inputRTxt;
                        break;
                    case "left":
                        this.input = this.RedT.board ? this.inputLeft : this.inputLTxt
                }
            },
            onChangerInput: function() {
                var t = s.numberWithCommas(s.getOnlyNumberInString(this.input.string));
                this.input.string = "0" == t ? "" : t
            },
            setPhien: function() {
                var t = cc.RedT.setting.taixiu.logs[0].phien + 1;
                this.labelPhien.string = "#" + t
            },
            setDice: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    i = this;
                this.dice.forEach(function(n, o) { e && (n.spriteFrame = i.diceSF[cc.RedT.setting.taixiu.logs[0].dice[o] - 1]), n.node.active = t })
            },
            onData: function(t) {
                if (void 0 !== t.get_phien && this.RedT.TX_LichSuPhien.onData(t.get_phien), void 0 !== t.err) {
                    var e = cc.instantiate(this.RedT.RedT.prefabMiniNotice);
                    e.getComponent("mini_warning").text.string = t.err, this.notice.addChild(e)
                }
                void 0 !== t.du_day && (Object.assign(cc.RedT.setting.taixiu.data.du_day, t.du_day), this.onDuDay(t.du_day)), void 0 !== t.taixiu && (Object.assign(cc.RedT.setting.taixiu.data.taixiu, t.taixiu), this.onDataTaiXiu(t.taixiu)), void 0 !== t.get_top && this.RedT.TX_Top.onData(t.get_top), void 0 !== t.chat && this.TX_Chat.onData(t.chat), void 0 !== t.status && this.status(t.status), void 0 !== t.get_log && this.RedT.TX_LichSu.onData(t.get_log), void 0 !== t.logs && (cc.RedT.setting.taixiu.logs = t.logs, this.dataLogs(), this.setPhien(), cc.RedT.setting.taixiu.time_remain > 60 && (this.setDice(!0), this.nodeTimeWait.active = !0, this.timeCuoc.node.active = !1), cc.RedT.setting.taixiu.getLogs = !0), void 0 !== t.time_remain && (cc.RedT.setting.taixiu.time_remain = t.time_remain, this.playTime()), void 0 !== t.update_time_remain && (cc.RedT.setting.taixiu.time_remain = t.update_time_remain), void 0 !== t.finish && (cc.RedT.setting.taixiu.getLogs && (void 0 !== this.timeInterval && clearInterval(this.timeInterval), cc.RedT.setting.taixiu.logs.unshift({ dice: [t.finish.dices[0], t.finish.dices[1], t.finish.dices[2]], phien: t.finish.phien }), cc.RedT.setting.taixiu.logs.length > 120 && cc.RedT.setting.taixiu.logs.pop(), this.diemSo = t.finish.dices[0] + t.finish.dices[1] + t.finish.dices[2], this.labelKetQua.string = this.diemSo, this.isNan ? (this.diaNan.active = !0, this.diaNan.position = cc.v2(-.749, -1.912), this.spriteNan.node.active = !1, this.onDiceAnimationFinish()) : (this.diceAnimation.node.active = !0, this.node.activeInHierarchy ? (this.diceAnimation.play(), this.smokeAnimation.active = !0) : this.onDiceAnimationFinish()), this.nodeTimeWait.active = !0, this.timeCuoc.node.active = !1), cc.RedT.setting.taixiu.time_remain = 77, this.playTime())
            },
            efStop: function() { this.efTai.stop(), this.efXiu.stop(), this.efTai_win.active = !1, this.efXiu_win.active = !1 },
            playTime: function() {
                void 0 !== this.timeInterval && clearInterval(this.timeInterval), this.timeInterval = setInterval(function() {
                    if (cc.RedT.setting.taixiu.time_remain > 61) {
                        null !== this.bg_Dice._animator && this.bg_Dice._animator.isPlaying && this.bg_Dice.stop(), this.bg_efDice.active = !1;
                        var t = s.numberPad(cc.RedT.setting.taixiu.time_remain - 62, 2);
                        this.timePopup.node.active && (this.timePopup.string = t) && (this.timePopup.node.color = cc.color(255, 0, 0, 255)), this.timeWait.string = "00:" + s.numberPad(t, 2), cc.RedT.setting.taixiu.time_remain < 71 && this.efStop(), cc.RedT.setting.taixiu.time_remain < 73 && (this.nodeKetQua.active = !1, this.isNan && (this.diaNan.active = !1), this.isNan && (this.diaNan.active = !1, this.dataLogs(), this.nodeKetQua.active = !0, this.diemSo > 10 ? (this.efTai.play(), this.efTai_win.active = !0) : (this.efXiu.play(), this.efXiu_win.active = !0)))
                    } else {
                        if (null !== this.bg_Dice._animator && !this.bg_Dice._animator.isPlaying) {
                            var e = this.bg_Dice.getAnimationState(this.bg_Dice._defaultClip.name);
                            e.speed = 1, this.bg_Dice._animator.playState(e)
                        }
                        if (null !== this.bg_Dice._animator && this.bg_Dice._animator.isPlaying && (cc.RedT.setting.taixiu.time_remain < 7 ? this.bg_Dice._animator._anims.array[0].speed = 10 : cc.RedT.setting.taixiu.time_remain < 23 ? this.bg_Dice._animator._anims.array[0].speed = 6 : cc.RedT.setting.taixiu.time_remain < 33 && (this.bg_Dice._animator._anims.array[0].speed = 3)), this.bg_efDice.active = !0, this.dice[0].node.active && (this.setDice(!1, !1), this.reset()), this.efStop(), this.nodeTimeWait.active = this.nodeKetQua.active = this.diaNan.active = !1, this.timeCuoc.node.active = this.spriteNan.node.active = !0, cc.RedT.setting.taixiu.time_remain > 0) {
                            t = s.numberPad(cc.RedT.setting.taixiu.time_remain - 1, 2);
                            cc.RedT.setting.taixiu.getLogs && (this.timeCuoc.string = +t), this.timePopup.node.active && (this.timePopup.string = t), cc.RedT.setting.taixiu.time_remain <= 10 ? this.timeCuoc.node.color = cc.color(255, 69, 69, 255) : this.timeCuoc.node.color = cc.Color.WHITE
                        } else clearInterval(this.timeInterval)
                    }
                    cc.RedT.setting.taixiu.time_remain--
                }.bind(this), 1e3)
            },
            nextRealTime: function() {
                if (cc.RedT.setting.taixiu.time_remain > 61) {
                    this.setDice(!0), this.nodeTimeWait.active = !0, this.timeCuoc.node.active = !1;
                    var t = s.numberPad(cc.RedT.setting.taixiu.time_remain - 62, 2);
                    this.timePopup.node.color = cc.color(255, 0, 0, 255), this.timePopup.string = t, this.timeWait.string = "00:" + s.numberPad(t, 2)
                } else if (this.nodeTimeWait.active = !1, this.timeCuoc.node.active = !0, cc.RedT.setting.taixiu.time_remain > 0) {
                    t = s.numberPad(cc.RedT.setting.taixiu.time_remain - 1, 2);
                    cc.RedT.setting.taixiu.getLogs && (this.timeCuoc.string = "00:" + t), this.timePopup.node.color = cc.Color.WHITE, this.timePopup.string = t, cc.RedT.setting.taixiu.time_remain <= 10 ? this.timeCuoc.node.color = cc.color(255, 69, 69, 255) : this.timeCuoc.node.color = cc.Color.WHITE
                }
            },
            onDataTaiXiu: function(t) { void 0 !== t.red_tai && (this.totalLeft.string = s.numberWithCommas(t.red_tai)), void 0 !== t.red_xiu && (this.totalRight.string = s.numberWithCommas(t.red_xiu)), void 0 !== t.red_me_tai && (this.myLeft.string = s.numberWithCommas(t.red_me_tai)), void 0 !== t.red_me_xiu && (this.myRight.string = s.numberWithCommas(t.red_me_xiu)), void 0 !== t.red_player_tai && (this.playerLeft.string = s.numberWithCommas(t.red_player_tai)), void 0 !== t.red_player_xiu && (this.playerRight.string = s.numberWithCommas(t.red_player_xiu)) },
            onDuDay: function(t) { this.WIN_HT.string = t.tLineWinRedH, this.WIN_DN.string = t.tLineWinRed, this.LOST_HT.string = t.tLineLostRedH, this.LOST_DN.string = t.tLineLostRed },
            dataLogs: function() {
                if (cc.RedT.setting.taixiu.logs.length) {
                    var t = this;
                    this.dotLogs.forEach(function(e, i) {
                        var n = cc.RedT.setting.taixiu.logs[i];
                        if (void 0 !== n) {
                            var o = n.dice[0] + n.dice[1] + n.dice[2];
                            e.node.active = !0, e.node.phien = n.phien, e.mod.text.string = n.dice[0] + "-" + n.dice[1] + "-" + n.dice[2], e.spriteFrame = o < 11 ? t.dot_white : t.dot_black
                        } else e.node.active = !1
                    });
                    var e = [],
                        i = [],
                        n = [],
                        o = [],
                        c = -1,
                        s = [],
                        a = [],
                        h = 0,
                        r = 0,
                        d = cc.RedT.setting.taixiu.logs.slice(0, 19);
                    d.reverse();
                    for (var u = 0; u < d.length; u++) {
                        if (void 0 !== d[u]) {
                            t.RedT.TX_ThongKe.lineAc(u, !0);
                            var l = d[u].dice[0],
                                p = d[u].dice[1],
                                g = d[u].dice[2],
                                m = l + p + g;
                            e[u] = { x: 28 * u, y: 28 * l - 28, dice: l }, i[u] = { x: 28 * u, y: 28 * p - 28, dice: p }, n[u] = { x: 28 * u, y: 28 * g - 28, dice: g }, o[u] = { x: 27.7 * u, y: 9.233 * m - 27.7, tong: m }
                        } else t.RedT.TX_ThongKe.lineAc(u, !1)
                    }
                    t.RedT.TX_ThongKe.draw(t.RedT.TX_ThongKe.dice1_line, t.RedT.TX_ThongKe.dice1_dots, e), t.RedT.TX_ThongKe.draw(t.RedT.TX_ThongKe.dice2_line, t.RedT.TX_ThongKe.dice2_dots, i), t.RedT.TX_ThongKe.draw(t.RedT.TX_ThongKe.dice3_line, t.RedT.TX_ThongKe.dice3_dots, n), t.RedT.TX_ThongKe.draw_Tong(t.RedT.TX_ThongKe.tong_line, o);
                    var f = Promise.all(this.RedT.TX_ThongKe.KetQuaDot.map(function(e, i) { var n = cc.RedT.setting.taixiu.logs[i]; if (void 0 !== n) { e.node.active = !0; var o = n.dice[0] + n.dice[1] + n.dice[2]; return e.spriteFrame = o < 11 ? t.dot_white : t.dot_black, o > 10 ? 1 : 0 } return e.node.active = !1, -1 })),
                        v = new Promise(function(t, e) {
                            var i = cc.RedT.setting.taixiu.logs.slice();
                            i.reverse();
                            var n = !0,
                                o = !1,
                                h = void 0;
                            try {
                                for (var r, d = i[Symbol.iterator](); !(n = (r = d.next()).done); n = !0) {
                                    var u = r.value,
                                        l = u.dice[0] + u.dice[1] + u.dice[2],
                                        p = l > 10 ? 1 : 0; - 1 === c && (c = p), (p != c || a.length > 4) && (c = p, s.push(a), a = []), p == c && a.push(l)
                                }
                            } catch (t) { o = !0, h = t } finally { try { n || null == d.return || d.return() } finally { if (o) throw h } }
                            s.push(a), t(s)
                        });
                    Promise.all([f, v]).then(function(e) {
                        var i = e[1];
                        i.reverse(), (i = i.slice(0, 20)).reverse(), t.RedT.TX_ThongKe.KetQuaLeft.string = e[0].filter(function(t) { return 1 == t }).length, t.RedT.TX_ThongKe.KetQuaRight.string = e[0].filter(function(t) { return 0 == t }).length, Promise.all(t.RedT.TX_ThongKe.DiemSoCel.map(function(e, n) {
                            var o = i[n];
                            if (void 0 !== o) return e.active = !0, Promise.all(e.RedT.map(function(e, i) {
                                var n = o[i];
                                if (void 0 !== n) {
                                    var c = n > 10;
                                    h = c ? h + 1 : h, r = c ? r : r + 1, e.node.active = !0, e.node.color = c ? cc.color().fromHEX("#B3A1A1") : cc.Color.WHITE, e.text.string = n, e.text.node.color = c ? cc.Color.WHITE : cc.Color.BLACK, e.spriteFrame = c ? t.dot_black : t.dot_white
                                } else e.node.active = !1
                            }));
                            e.active = !1
                        })).then(function(e) { t.RedT.TX_ThongKe.DiemSoLeft.string = h, t.RedT.TX_ThongKe.DiemSoRight.string = r })
                    })
                }
            },
            reset: function() { this.setPhien(), this.isNan && this.dataLogs(), cc.RedT.setting.taixiu.data.taixiu.red_me_tai = cc.RedT.setting.taixiu.data.taixiu.red_me_xiu = cc.RedT.setting.taixiu.data.taixiu.red_player_tai = cc.RedT.setting.taixiu.data.taixiu.red_player_xiu = cc.RedT.setting.taixiu.data.taixiu.red_tai = cc.RedT.setting.taixiu.data.taixiu.red_xiu = this.totalLeft.string = this.totalRight.string = this.myLeft.string = this.myRight.string = this.playerLeft.string = this.playerRight.string = 0 },
            setDefautl: function() { cc.RedT.setting.taixiu.getLogs = this.nodeTimePopup.active = !1, void 0 !== this.timeInterval && clearInterval(this.timeInterval), clearTimeout(this.regTimeOut), clearTimeout(this.regTimeOut2), this.TX_Chat.reset() },
            status: function(t) {
                this.regTimeOut = setTimeout(function() {
                    if (!this.isNan) {
                        var e = new cc.Node;
                        if (e.addComponent(cc.Label), (e = e.getComponent(cc.Label)).string = (t.win ? "+" : "-") + s.numberWithCommas(t.bet), e.font = t.win ? this.fontCong : this.fontTru, e.lineHeight = 130, e.fontSize = 22, e.node.position = cc.v2(t.select ? -252 : 252, -50), this.notice.addChild(e.node), e.node.runAction(cc.sequence(cc.moveTo(3, cc.v2(t.select ? -252 : 252, 130)), cc.callFunc(function() { this.node.destroy() }, e))), void 0 !== t.thuong && t.thuong > 0) {
                            var i = new cc.Node;
                            i.addComponent(cc.Label), (i = i.getComponent(cc.Label)).string = (t.win ? "+" : "-") + s.numberWithCommas(t.thuong), i.font = cc.RedT.util.fontEffect, i.lineHeight = 90, i.fontSize = 14, this.notice.addChild(i.node), i.node.runAction(cc.sequence(cc.moveTo(3, cc.v2(0, 100)), cc.callFunc(function() { this.node.destroy() }, i)))
                        }
                    }
                    cc.RedT.send({ taixiu: { get_new: !0 } })
                }.bind(this), 2e3)
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper", TaiXiuBoard: "TaiXiuBoard", TaiXiuChat: "TaiXiuChat", TaiXiu_efScale: "TaiXiu_efScale", TaiXiu_money_efScale: "TaiXiu_money_efScale" }],
    TaiXiuThongKe: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "44a1auDXjdMUYNeCt2i6vXW", "TaiXiuThongKe"), cc.Class({
            extends: cc.Component,
            properties: { background: cc.Node, header: cc.Node, body: cc.Node, KetQuaLeft: cc.Label, KetQuaRight: cc.Label, KetQuaDot: cc.Node, DiemSoCel: cc.Node, DiemSoLeft: cc.Label, DiemSoRight: cc.Label, node1: cc.Node, node2: cc.Node, dice1_line: cc.Graphics, dice2_line: cc.Graphics, dice3_line: cc.Graphics, tong_line: cc.Graphics, dice1_dot: cc.Node, dice2_dot: cc.Node, dice3_dot: cc.Node, tong_dot: cc.Node, line_dotT: cc.Node, line_dot1: cc.Node, line_dot2: cc.Node, line_dot3: cc.Node },
            init: function(t) { this.RedT = t, void 0 !== cc.RedT.setting.taixiu.tk_position && (this.node.position = cc.RedT.setting.taixiu.tk_position), void 0 !== cc.RedT.setting.taixiu.tk_active && (this.node.active = cc.RedT.setting.taixiu.tk_active), this.KetQuaDot = this.KetQuaDot.children.map(function(t) { return t.getComponent(cc.Sprite) }), this.DiemSoCel = this.DiemSoCel.children.map(function(t) { return t.RedT = t.children.map(function(t) { return (t = t.getComponent(cc.Sprite)).text = t.node.children[0].getComponent(cc.Label), t }), t }), this.dice1_dots = this.dice1_dot.children.map(function(t) { return t.text = t.children[0].getComponent(cc.Label), t }), this.dice2_dots = this.dice2_dot.children.map(function(t) { return t.text = t.children[0].getComponent(cc.Label), t }), this.dice3_dots = this.dice3_dot.children.map(function(t) { return t.text = t.children[0].getComponent(cc.Label), t }), this.tong_dots = this.tong_dot.children.map(function(t) { return (t = t.getComponent(cc.Sprite)).text = t.node.children[0].getComponent(cc.Label), t }) },
            onLoad: function() { this.ttOffset = null },
            onEnable: function() { this.background.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.background.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.background.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.background.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.background.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.background.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) },
            eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) },
            eventEnd: function() { cc.RedT.setting.taixiu.tk_position = this.node.position },
            setTop: function() { this.node.parent.insertChild(this.node), this.RedT.setTop() },
            onSelectHeader: function(t, e) {},
            onToggleClick: function() { cc.RedT.audio.playClick(), this.setTop(), this.node.active = cc.RedT.setting.taixiu.tk_active = !this.node.active },
            onChangerClick: function() { this.node1.active = !this.node1.active, this.node2.active = !this.node2.active },
            draw: function(t, e, i) {
                t.clear();
                for (var n = i.length, o = 0; o < n; o++) {
                    var c = e[o],
                        s = i[o];
                    c.text.string = s.dice, c.position = cc.v2(c.position.x, s.y), 0 === o ? t.moveTo(s.x, s.y) : t.lineTo(s.x, s.y)
                }
                t.stroke()
            },
            draw_Tong: function(t, e) {
                t.clear();
                for (var i = 0, n = e.length; i < n; i++) {
                    var o = e[i],
                        c = this.tong_dots[i];
                    0 === i ? t.moveTo(o.x, o.y) : t.lineTo(o.x, o.y), c.text.string = o.tong, c.text.node.color = this.RedT.TX_Main.taixiu ? o.tong > 10 ? cc.Color.WHITE : cc.Color.BLACK : o.tong % 2 ? cc.Color.WHITE : cc.Color.BLACK, c.node.position = cc.v2(c.node.position.x, o.y), c.node.color = this.RedT.TX_Main.taixiu ? o.tong > 10 ? cc.color().fromHEX("#B3A1A1") : cc.Color.WHITE : o.tong % 2 ? cc.Color.BLACK : cc.Color.YELLOW, c.spriteFrame = o.tong > 10 ? this.RedT.TX_Main.dot_black : this.RedT.TX_Main.dot_white
                }
                t.stroke()
            },
            lineAc: function(t, e) { this.dice1_dots[t].active = e, this.dice2_dots[t].active = e, this.dice3_dots[t].active = e, this.tong_dots[t].node.active = e },
            showLineTong: function() { cc.RedT.audio.playClick(), this.tong_dot.active = !this.tong_dot.active, this.tong_line.node.active = !this.tong_line.node.active, this.line_dotT.active = !this.line_dotT.active },
            showLineDice1: function() { cc.RedT.audio.playClick(), this.dice1_dot.active = !this.dice1_dot.active, this.dice1_line.node.active = !this.dice1_line.node.active, this.line_dot1.active = !this.line_dot1.active },
            showLineDice2: function() { cc.RedT.audio.playClick(), this.dice2_dot.active = !this.dice2_dot.active, this.dice2_line.node.active = !this.dice2_line.node.active, this.line_dot2.active = !this.line_dot2.active },
            showLineDice3: function() { cc.RedT.audio.playClick(), this.dice3_dot.active = !this.dice3_dot.active, this.dice3_line.node.active = !this.dice3_line.node.active, this.line_dot3.active = !this.line_dot3.active }
        }), cc._RF.pop()
    }, {}],
    TaiXiuTop: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5c979o56KBFA7IxEoBHBpgJ", "TaiXiuTop");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node },
            onLoad: function() { this.content = this.content.children.map(function(t) { return t.getComponent("TaiXiu_topItem") }), this.get_data() },
            get_data: function() { cc.RedT.send({ taixiu: { get_top: { red: !0, taixiu: !0 } } }) },
            onEnable: function() { this.content && this.get_data() },
            onData: function(t) {
                this.content.forEach(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, i > 2 && (e.top.node.active = !0, e.top.string = i + 1), e.nick.string = o.name, e.win.string = n.numberWithCommas(o.bet)) : e.node.active = !1
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    TaiXiu_DiaNan: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "48692rupkxLUqFjhMjk6S43", "TaiXiu_DiaNan"), cc.Class({ extends: cc.Component, init: function(t) { this.RedT = t }, onLoad: function() { this.ttOffset = null }, onEnable: function() { this.node.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.node.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) }, onDisable: function() { this.node.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.node.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) }, eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y) }, eventMove: function(t) { this.node.position = cc.v2(t.touch.getLocationX() - this.ttOffset.x, t.touch.getLocationY() - this.ttOffset.y) }, eventEnd: function() {}, setTop: function() { this.RedT.setTop() } }), cc._RF.pop()
    }, {}],
    TaiXiu_efScale: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1dcc4TRp5REZa8M+IY8ljzM", "TaiXiu_efScale"), cc.Class({ extends: cc.Component, play: function() { this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.15, .85), cc.scaleTo(.15, 1.15)))) }, stop: function() { this.node.stopAllActions(), this.node.scale = 1 } }), cc._RF.pop()
    }, {}],
    TaiXiu_money_efScale: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3a1409pKo5B2LqXmEaJpU2a", "TaiXiu_money_efScale"), cc.Class({ extends: cc.Component, play: function() { this.node.runAction(cc.sequence(cc.scaleTo(.15, .95), cc.scaleTo(.15, 1.1))) }, stop: function() { this.node.stopAllActions(), this.node.scale = 1 } }), cc._RF.pop()
    }, {}],
    TaiXiu_topItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9f880MppyFGFavfg+L9Oz+9", "TaiXiu_topItem"), cc.Class({ extends: cc.Component, properties: { top: cc.Label, nick: cc.Label, win: cc.Label } }), cc._RF.pop()
    }, {}],
    TaiXiu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "72234cg0ORLl7lPDSiermrl", "TaiXiu");
        var n = t("TaiXiuMain"),
            o = t("TaiXiuThongKe");
        cc.Class({
            extends: cc.Component,
            properties: { TX_Main: n, TX_ThongKe: o, board: !0 },
            init: function(t) {
                this.RedT = t, this.node.runScale = !1, cc.RedT.setting.taixiu = cc.RedT.setting.taixiu || { scale: 1, getLogs: !1 }, this.TX_LichSu = t.Dialog.TaiXiuLichSu, this.TX_Top = t.Dialog.TaiXiuTop, this.TX_LichSuPhien = t.Dialog.TaiXiuLichSuPhien, this.TX_Main.init(this), this.TX_ThongKe.init(this);
                localStorage.getItem("taixiu")
            },
            onEnable: function() { this.regEvent(!0) },
            onDisable: function() { this.regEvent(!1) },
            regEvent: function(t) { cc.RedT.send({ taixiu: cc.RedT.setting.taixiu.getLogs ? { view: t, get_time: !0 } : { view: t, getLogs: !0, get_time: !0 } }) },
            setTop: function() { cc.RedT.setting.taixiu.scale = 1, this.node.parent.insertChild(this.node), this.RedT.setTop(this.node) },
            openGame: function(t, e) { void 0 === e && (e = "1"), cc.RedT.audio.playClick(), cc.RedT.IS_LOGIN ? (this.node.active = !0, localStorage.setItem("taixiu", !0), this.setTop()) : cc.RedT.inGame.dialog.showSignIn() },
            closeGame: function() { cc.RedT.audio.playUnClick(), this.node.active = this.TX_ThongKe.node.active = this.TX_Main.TX_Board.node.active = !1, localStorage.setItem("taixiu", !1) },
            newGame: function() { this.TX_ThongKe.node.active = this.TX_Main.TX_Board.node.active = !1, this.TX_Main.setDefautl() },
            signIn: function() {!this.node.active && (this.TX_Main.nodeTimePopup.active = !0) }
        }), cc._RF.pop()
    }, { TaiXiuMain: "TaiXiuMain", TaiXiuThongKe: "TaiXiuThongKe" }],
    TheCao_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6bcb3yYhadCDJYjR6a7bVNL", "TheCao_item"), cc.Class({ extends: cc.Component, properties: { NhaMang: { default: null, type: cc.Label }, MenhGia: { default: null, type: cc.Label }, SoThe: { default: null, type: cc.Label }, Seri: { default: null, type: cc.Label }, HetHan: { default: null, type: cc.Label } }, CopyToClipboard: function() { cc.RedT.CopyToClipboard(this.NhaMang.string + " - M\xe3 th\u1ebb: " + this.SoThe.string + " - Seri: " + this.Seri.string), cc.RedT.inGame.noticeCopy() } }), cc._RF.pop()
    }, {}],
    TheCao: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "676e1K7f8tL+pOgcGRRKm5C", "TheCao");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: {},
            init: function() { this.TheCao = this.node.children.map(function(t) { return t.getComponent("TheCao_item") }) },
            onEnable: function() { this.node.runAction(cc.RedT.inGame.dialog.actionShow) },
            onDisable: function() { cc.RedT.inGame.dialog.resetSizeDialog(this.node) },
            onData: function(t) { this.setData(t), cc.RedT.inGame.loading.active = !1, cc.RedT.inGame.dialog.objShow && (cc.RedT.inGame.dialog.objShow.active = !1, this.node.previous = cc.RedT.inGame.dialog.objShow), this.node.active = cc.RedT.inGame.dialog.node.active = !0, cc.RedT.inGame.dialog.objShow = this.node },
            getData: function(t) { cc.RedT.inGame.loading.active = !0, cc.RedT.send({ user: { history: { the_cao: t } } }) },
            setData: function(t) {
                this.TheCao.forEach(function(e, i) {
                    var o = t[i];
                    void 0 !== o ? (e.node.active = !0, e.NhaMang.string = o.nhaMang, e.MenhGia.string = n.numberWithCommas(o.menhGia), e.SoThe.string = o.maThe, e.Seri.string = o.seri, e.HetHan.string = o.time) : null != e && (e.node.active = !1)
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    ThongBaoNoHu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2032a+ToBpAt7K48nuzmY5R", "ThongBaoNoHu");
        t("ThongBaoNoHu");
        cc.Class({ extends: cc.Component, properties: { animation: cc.Animation, title: cc.Label, users: cc.Label, bet: cc.Label }, init: function(t) { this.RedT = t }, onLoad: function() { this.node.y = -133, this.node.runAction(cc.sequence(cc.moveTo(2, cc.v2(0, 77)), cc.callFunc(function() { cc.RedT.audio.playNoticeJackP() }, this), cc.delayTime(7), cc.callFunc(function() { this.RedT.pushNotice(), this.node.destroy() }, this))) } }), cc._RF.pop()
    }, { ThongBaoNoHu: "ThongBaoNoHu" }],
    ThongKe: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e66dfYHZlFFdLW8er+lV+Wc", "ThongKe"), cc.Class({ extends: cc.Component, properties: {}, onLoad: function() {} }), cc._RF.pop()
    }, {}],
    TieuRed: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "00244bdHdZHHoauw7/tgQlF", "TieuRed"), cc.Class({ extends: cc.Component, properties: { header: { default: null, type: cc.Node }, MuaTheCao: { default: null, type: cc.Node } }, init: function() { this.MuaTheCao = this.MuaTheCao.getComponent("shopMuaTheCao"), this.MuaTheCao.init(), this.body = [this.MuaTheCao] }, onSelectHead: function(t, e) { Promise.all(this.header.map(function(t) { t.node.name == e ? t.select() : t.unselect() })), Promise.all(this.body.map(function(t) { t.node.name == e ? t.node.active = !0 : t.node.active = !1 })) } }), cc._RF.pop()
    }, {}],
    VQRed_dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "bbbb3PXVVZETqpYijqFqO6r", "VQRed_dialog");
        var n = t("VQRed_history"),
            o = t("VQRed_top"),
            c = t("VQRed_setting");
        cc.Class({ extends: cc.Component, properties: { history: n, top: o, setting: c }, init: function() { this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showHistory: function() { this.node.active = this.history.node.active = !0, this.objShow = this.history.node }, showTop: function() { this.node.active = this.top.node.active = !0, this.objShow = this.top.node }, showSetting: function() { this.node.active = this.setting.node.active = !0, this.objShow = this.setting.node } }), cc._RF.pop()
    }, { VQRed_history: "VQRed_history", VQRed_setting: "VQRed_setting", VQRed_top: "VQRed_top" }],
    VQRed_history_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "95d5aIW7xZHfKL9yYH2NHME", "VQRed_history_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, phien: cc.Label, cuoc: cc.Label, line: cc.Label, win: cc.Label } }), cc._RF.pop()
    }, {}],
    VQRed_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "66e9cqNtPFCw6Q48VfYKZ/M", "VQRed_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, red: !0 },
            onLoad: function() {
                var t = cc.instantiate(this.page);
                t.y = -284, this.node.addChild(t), this.page = t.getComponent("Pagination"), this.content = this.content.children.map(function(t) { return t.getComponent("VQRed_history_item") }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { vq_red: { log: { red: this.red, page: t } } } }) },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.bg.active = i % 2, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.cuoc.string = n.numberWithCommas(o.bet), e.line.string = o.kq + " d\xf2ng", e.win.string = n.numberWithCommas(o.win)) : e.node.active = !1
                })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    VQRed_main_line: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3a5fblcwjpEZ7XEnO1IJ3kk", "VQRed_main_line"), cc.Class({ extends: cc.Component, init: function(t) { return this.RedT = t, this }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onhover, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.offhover, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onhover, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.offhover, this) }, onhover: function() { this.node.children[1].active = !0 }, offhover: function() { this.node.children[1].active = !1 }, onEf: function() { this.onhover(), this.node.pauseSystemEvents() }, offEf: function() { this.offhover(), this.node.resumeSystemEvents() } }), cc._RF.pop()
    }, {}],
    VQRed_setting: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3d99bnmP4tPiIMEZDUmt8Ls", "VQRed_setting");
        var n = t("CheckOut");
        cc.Class({ extends: cc.Component, properties: { NhacNen: n, NhacGame: n }, onLoad: function() { cc.RedT.isSoundBackground() || this.NhacNen.OnChangerClick(), cc.RedT.isSoundGame() || this.NhacGame.OnChangerClick() }, onEnable: function() { this.node.runAction(cc.RedT.inGame.dialog.actionShow) }, onDisable: function() { cc.RedT.inGame.dialog.resetSizeDialog(this.node) }, OnChangerNhacNen: function() { cc.RedT.setSoundBackground(this.NhacNen.isChecked), this.NhacNen.isChecked ? cc.RedT.inGame.playMusic() : cc.RedT.inGame.pauseMusic() }, OnChangerNhacGame: function() { cc.RedT.setSoundGame(this.NhacGame.isChecked), this.NhacGame.isChecked ? cc.RedT.IS_SOUND = !0 : cc.RedT.IS_SOUND = !1 } }), cc._RF.pop()
    }, { CheckOut: "CheckOut" }],
    VQRed_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f06e8UHmbpN76XdRUrDkJvM", "VQRed_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { vq_red: { top: this.red } } }) },
            onData: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("VQRed_history_item")).time.string = n.getStringDateByTime(t.time), i.phien.string = t.name, i.cuoc.string = n.numberWithCommas(t.bet), i.line.string = n.numberWithCommas(t.win), i.win.string = 2 === t.type ? "N\u1ed5 H\u0169" : "Th\u1eafng l\u1edbn", i.node.children[0].active = e % 2, this.content.addChild(i.node)
                }.bind(this))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    VipPoint: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fb703nxG29BG5+Elfd1bY3Y", "VipPoint");
        var n = t("Helper");
        cc.Class({ extends: cc.Component, properties: { nodeRank: cc.Node, nodeNhan: cc.Node, vipLevel: cc.Label, vipTong: cc.Label, vipHien: cc.Label, vipTiep: cc.Label }, init: function() {}, onEnable: function() { this.node.runAction(cc.RedT.inGame.dialog.actionShow), this.getLevel() }, getLevel: function() { cc.RedT.send({ user: { getLevel: !0 } }) }, level: function(t) { cc.RedT.userData(t), cc.RedT.user.vipHT = t.vipHT - t.vipPre, cc.RedT.user.vipNext = t.vipNext - t.vipPre, cc.RedT.inGame.header.level(t.level), cc.RedT.inGame.header.updateEXP(cc.RedT.user.vipHT, cc.RedT.user.vipNext), this.vipLevel.string = "VIP" + t.level, this.vipTong.string = n.numberWithCommas(t.vipTL), this.vipHien.string = n.numberWithCommas(t.vipHT), this.vipTiep.string = n.numberWithCommas(t.vipNext), this.nodeRank.children.forEach(function(e, i) { e.name <= t.level ? (e.opacity = 255, e.name == t.level ? this.nodeNhan.children[i].children[3].active = !0 : this.nodeNhan.children[i].children[3].active = !1) : (e.opacity = 99, this.nodeNhan.children[i].children[3].active = !1) }.bind(this)) }, onNhanThuong: function() { cc.RedT.send({ user: { nhanthuong: !0 } }) } }), cc._RF.pop()
    }, { Helper: "Helper" }],
    VuongQuocRed_bigWin: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ff622y7T/JKaZl38DVd0WTJ", "VuongQuocRed_bigWin"), cc.Class({ extends: cc.Component, properties: {}, start: function() {} }), cc._RF.pop()
    }, {}],
    VuongQuocRed_items: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "aab4d3N+XxIp75z3i5xXpS8", "VuongQuocRed_items"), cc.Class({ extends: cc.Component, properties: { icon: cc.Sprite, icon4: cc.Node, icon5: cc.Node, icon6: cc.Node }, init: function(t) { this.RedT = t }, random: function() { var t = 7 * Math.random() >> 0; return this.setIcon(t), t }, setIcon: function(t, e) { void 0 === e && (e = !1), 4 === t ? (this.icon4.active = !0, this.icon.node.active = this.icon5.active = this.icon6.active = !1) : 5 === t ? (this.icon5.active = !0, this.icon.node.active = this.icon4.active = this.icon6.active = !1) : 6 === t ? (this.icon6.active = !0, this.icon.node.active = this.icon4.active = this.icon5.active = !1) : (this.icon.node.active = !0, this.icon4.active = this.icon5.active = this.icon6.active = !1, this.icon.spriteFrame = this.RedT.icons[t]), e && (this.data = t) } }), cc._RF.pop()
    }, {}],
    VuongQuocRed_line: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "70127RbBKFG06+Pa5WThYLM", "VuongQuocRed_line");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { nodeLine: cc.Node, mainLine: cc.Node },
            init: function(t) {
                this.RedT = t;
                var e = this;
                this.mainLine = this.mainLine.children.map(function(t) { return t.getComponent("VQRed_main_line").init(e.RedT) }), this.selectAll(null, "1")
            },
            onOpen: function() { cc.RedT.audio.playClick(), this.node.active = !0 },
            onClose: function() { cc.RedT.audio.playUnClick(), this.node.active && this.data.length < 1 ? this.RedT.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : this.node.active = !1 },
            select: function(t) {
                var e = t.target;
                e.children[0].active ? (e.children[0].active = !1, e.children[1].active = !0) : (e.children[0].active = !0, e.children[1].active = !1), this.check()
            },
            check: function() {
                var t = this;
                Promise.all(this.nodeLine.children.map(function(t, e) { return t.children[0].active ? e + 1 : void 0 })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length + " d\xf2ng", t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectChan: function() {
                var t = this;
                Promise.all(this.nodeLine.children.map(function(t, e) {
                    var i = e + 1;
                    if (!(i % 2)) return t.children[0].active = !1, t.children[1].active = !0, i;
                    t.children[0].active = !0, t.children[1].active = !1
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length + " d\xf2ng", t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectLe: function() {
                var t = this;
                Promise.all(this.nodeLine.children.map(function(t, e) {
                    var i = e + 1;
                    if (i % 2) return t.children[0].active = !1, t.children[1].active = !0, i;
                    t.children[0].active = !0, t.children[1].active = !1
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length + " d\xf2ng", t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectAll: function(t, e) {
                var i = this;
                Promise.all(this.nodeLine.children.map(function(t, i) { var n = "1" == e; return t.children[0].active = n, t.children[1].active = !n, n ? i + 1 : void 0 })).then(function(t) { Promise.all(t.filter(function(t, e) { return void 0 !== t })).then(function(t) { i.data = t, i.RedT.labelLine.string = t.length + " d\xf2ng", i.RedT.tong.string = n.numberWithCommas(t.length * n.getOnlyNumberInString(i.RedT.bet.string)) }) })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    VuongQuocRed_playBonus: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f4a82MExGBOZIu6dvi480mF", "VuongQuocRed_playBonus");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { numberBonus: cc.Label, listBox: cc.Node, notice: cc.Node, numberWin: cc.Label },
            init: function(t) { this.RedT = t },
            onPlay: function() { this.reset(), this.node.active = !0, this.numberBonus.string = 10 },
            onClickBox: function(t, e) { this.numberBonus.string && (cc.RedT.audio.playClick(), this.onSend(e)) },
            closeNotice: function() { this.notice.active = this.node.active = !1, this.RedT.hieuUng() },
            onData: function(t) {
                if (void 0 !== t.box) {
                    var e = this.listBox.children[t.box];
                    e.children[0].active = !1, e.children[1].active = e.children[2].active = !0, e.children[2].getComponent(cc.Label).string = n.numberWithCommas(t.bet), this.numberBonus.string = t.bonus
                }
                void 0 !== t.win && (this.notice.active = !0, this.numberWin.string = n.numberWithCommas(t.win), this.RedT.vuathang.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.RedT.vuathang.string) + t.win))
            },
            onSend: function(t) { cc.RedT.send({ g: { vq_red: { bonus: { box: t } } } }) },
            reset: function() { Promise.all(this.listBox.children.map(function(t) { t.children[0].active = !0, t.children[1].active = t.children[2].active = !1 })) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    VuongQuocRed_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d81dcoZgsNLupexKbEe58JH", "VuongQuocRed_reel"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = this,
                    n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                Promise.all(n.map(function(t, e) { var o = cc.instantiate(i.RedT.iconPrefab); return i.node.addChild(o), (o = o.getComponent("VuongQuocRed_items")).init(i.RedT), e > 2 && e < n.length - 3 && o.random(), o })).then(function(t) { e.icons = t, e.icons[e.icons.length - 1].setIcon(e.icons[4].random()), e.icons[e.icons.length - 2].setIcon(e.icons[3].random()), e.icons[e.icons.length - 3].setIcon(e.icons[2].random()), e.icons[e.icons.length - 4].setIcon(e.icons[1].random()), e.icons[e.icons.length - 5].setIcon(e.icons[0].random()) })
            },
            spin: function(t) {
                this.node.stopAllActions();
                var e = cc.moveTo(1, cc.v2(this.node.x, -(this.node.height - 472))).easing(cc.easeInOut(3)),
                    i = cc.callFunc(function() { 0 === t && this.RedT.copy(), this.node.y = 0 }, this);
                if (4 === t) {
                    var n = cc.callFunc(function() { this.RedT.EF_vuathang(), this.node.y = 0, this.RedT.random(), this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, n))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * t), e, i))
            },
            stop: function() { this.node.stopAllActions(), this.RedT.copy(), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    VuongQuocRed: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "23064kjFttJ5pk+vT43QFXz", "VuongQuocRed");
        var n = t("Helper"),
            o = t("VuongQuocRed_reel"),
            c = t("VuongQuocRed_line"),
            s = t("VuongQuocRed_playBonus"),
            a = t("Notice"),
            h = t("VQRed_dialog");
        cc.Class({
            extends: cc.Component,
            properties: { gameBonus: s, audioClick: cc.AudioSource, redhat: { default: null, type: cc.Node }, reels: { default: [], type: o }, icons: { default: [], type: cc.SpriteFrame }, betString: { default: [], type: cc.String }, iconPrefab: { default: null, type: cc.Prefab }, BigWin: cc.Animation, BigWin_Label: cc.Label, NoHu: cc.Animation, NoHu_Label: cc.Label, EF_Bonus: cc.Animation, EF_Free: cc.Animation, buttonLine: cc.Node, buttonSpin: cc.Node, buttonFree: cc.Node, freeLabel: cc.Label, buttonAuto: cc.Node, buttonStop: cc.Node, nodeChangerBet: cc.Node, bet: { default: null, type: cc.Label }, nodeNotice: cc.Node, prefabNotice: { default: null, type: cc.Prefab }, loading: { default: null, type: cc.Node }, notice: a, dialog: h, Line: c, hu: cc.Label, taikhoan: cc.Label, tong: cc.Label, vuathang: cc.Label, labelLine: cc.Label, bangThuong: cc.Node, isAuto: !1, isSpin: !1, isFreeSpin: !1, red: !0, betSelect: 0 },
            onLoad: function() { cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat, cc.RedT.audio.bg.pause(), cc.RedT.audio.bg = cc.RedT.audio.bgSlot1, this.BigWin.on("finished", this.BigWinFinish, this), this.BigWin.on("play", this.BigWinPlay, this), this.NoHu.on("finished", this.NoHuFinish, this), this.NoHu.on("play", this.NoHuPlay, this), this.EF_Bonus.on("finished", this.EF_BonusFinish, this), this.EF_Free.on("finished", this.EF_FreeFinish, this), this.gameBonus.init(this), this.Line.init(this), this.dialog.init(), this.reels.forEach(function(t) { t.init(this) }.bind(this)), cc.RedT.send({ scene: "vq_red" }), this.taikhoan.string = n.numberWithCommas(cc.RedT.user.red), this.speed = 400, cc.RedT.isSoundBackground() && (cc.RedT.setSoundBackground(!0), cc.RedT.audio.bg.play()) },
            BigWinPlay: function() {
                var t = cc.callFunc(function() { cc.RedT.audio.playEf("megaWin"), n.numberTo(this.BigWin_Label, 0, this.H_win, 2e3, !0) }, this);
                this.BigWin.node.runAction(cc.sequence(cc.delayTime(.3), t))
            },
            BigWinFinish: function() { this.isBigWin = !1, this.BigWin.node.active = !1, this.BigWin_Label.string = "", this.showLineWin(!1), this.hieuUng() },
            NoHuPlay: function() {
                var t = cc.callFunc(function() { cc.RedT.audio.playEf("jackpot"), n.numberTo(this.NoHu_Label, 0, this.H_win, 2e3, !0) }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(.3), t))
            },
            NoHuFinish: function() { this.isNoHu = !1, this.NoHu.node.active = !1, this.NoHu_Label.string = "", this.isAuto && this.onAuto(), this.showLineWin(!1), this.hieuUng() },
            EF_BonusFinish: function() { this.isBonus = !1, this.EF_Bonus.node.active = !1, this.gameBonus.onPlay(), this.showLineWin(!1) },
            EF_FreeFinish: function() { this.isFree = !1, this.EF_Free.node.active = !1, this.showLineWin(!1), this.hieuUng() },
            EF_vuathang: function() { this.showLineWin(!0), this.vuathang.string = n.numberWithCommas(this.H_win), this.buttonFree.active = !!this.H_free, this.buttonSpin.active = !this.H_free, this.freeLabel.string = this.H_free },
            onChangerBetR: function() { cc.RedT.audio.playClick(), this.betSelect++, this.betSelect > 2 && (this.betSelect = 0), this.bet.string = this.betString[this.betSelect], this.tong.string = n.numberWithCommas(this.Line.data.length * n.getOnlyNumberInString(this.bet.string)), this.onGetHu() },
            onChangerBetL: function() { cc.RedT.audio.playClick(), this.betSelect--, this.betSelect < 0 && (this.betSelect = 2), this.bet.string = this.betString[this.betSelect], this.tong.string = n.numberWithCommas(this.Line.data.length * n.getOnlyNumberInString(this.bet.string)), this.onGetHu() },
            onClickSpin: function() { cc.RedT.IS_SOUND && this.audioClick.play(), this.onSpin() },
            onAutoSpin: function() { cc.RedT.IS_SOUND && this.audioClick.play(), this.onGetSpin() },
            onClickAuto: function() { cc.RedT.audio.playClick(), this.onAuto() },
            onClickStop: function() { cc.RedT.audio.playClick(), this.onStop() },
            onSpin: function() { this.Line.data.length < 1 ? this.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : (this.setSpin(), this.isSpin || (this.node.stopAllActions(), void 0 !== this.eflineN && void 0 !== this.H_line_win && this.H_line_win.length && this.efOneLineWin(this.eflineN, !1), this.eflineO = this.eflineN = 0, this.isSpin = !0, this.onGetSpin())) },
            onAuto: function() { this.isAuto = !this.isAuto, this.buttonAuto.color = this.isAuto ? cc.Color.WHITE : cc.color(200, 200, 200), this.buttonStop.active = this.isSpin, this.buttonAuto.active = !this.isSpin },
            onStop: function() { this.isAuto = this.buttonStop.active = !1, this.buttonAuto.active = !0, this.buttonAuto.color = cc.color(200, 200, 200) },
            setSpin: function() { this.buttonLine.pauseSystemEvents(), this.buttonSpin.pauseSystemEvents(), this.nodeChangerBet.pauseSystemEvents() },
            resetSpin: function() { this.isAuto && this.onAuto(), this.isSpin = this.buttonStop.active = !1, this.buttonAuto.active = !0, this.buttonLine.resumeSystemEvents(), this.buttonSpin.resumeSystemEvents(), this.nodeChangerBet.resumeSystemEvents() },
            runReels: function() { Promise.all(this.reels.map(function(t, e) { t.spin(e) })) },
            copy: function() { this.reels.forEach(function(t) { t.icons[t.icons.length - 1].setIcon(t.icons[2].data), t.icons[t.icons.length - 2].setIcon(t.icons[1].data), t.icons[t.icons.length - 3].setIcon(t.icons[0].data) }) },
            random: function() { this.reels.forEach(function(t) { t.icons.forEach(function(e, i) { i > 2 && i < t.icons.length - 3 && e.random() }) }) },
            onLineWin: function(t) {
                this.H_line_win.forEach(function(e) {
                    var i = this.Line.mainLine[e.line - 1];
                    t ? (i.onhover(), i.node.pauseSystemEvents()) : (i.offhover(), i.node.resumeSystemEvents())
                }.bind(this))
            },
            showLineWin: function(t) { this.onLineWin(t), t || this.isNoHu || this.isBigWin || this.isAuto || this.isFreeSpin || (this.eflineN = 0, this.efLineWin()) },
            efLineWin: function(t) {
                if (this.H_line_win.length) {
                    this.node.stopAllActions(), void 0 === this.H_line_win[this.eflineN] && (this.eflineN = 0), this.efOneLineWin(this.eflineN, !0);
                    var e = cc.callFunc(function() { this.efOneLineWin(this.eflineN, !1), this.eflineN += 1, this.efLineWin() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(1.5), e))
                }
            },
            efOneLineWin: function(t, e) {
                t = this.H_line_win[this.eflineN].line;
                var i = this.Line.mainLine[t - 1];
                e ? (i.onhover(), i.node.pauseSystemEvents()) : (i.offhover(), i.node.resumeSystemEvents())
            },
            hieuUng: function() {
                if (this.isBigWin && !this.isNoHu) this.BigWin.node.active = !0, this.BigWin.play();
                else if (this.isNoHu) this.NoHu.node.active = !0, this.NoHu.play();
                else if (this.isBonus) this.EF_Bonus.node.active = !0, this.EF_Bonus.play(), cc.RedT.audio.playEf("bonus");
                else if (this.isFree) this.EF_Free.node.active = !0, this.EF_Free.play();
                else if (this.H_win > 0) {
                    var t = new cc.Node;
                    t.addComponent(cc.Label), (t = t.getComponent(cc.Label)).string = "+" + n.numberWithCommas(this.H_win), t.font = cc.RedT.util.fontCong, t.lineHeight = 130, t.fontSize = 25, t.node.position = cc.v2(0, 21), this.nodeNotice.addChild(t.node), t.node.runAction(cc.sequence(cc.moveTo(1.2, cc.v2(0, 105)), cc.callFunc(function() { this.speed = 0, t.node.destroy(), this.hieuUng(), this.showLineWin(!1) }, this))), this.H_win = 0
                } else this.isAuto || this.isFreeSpin ? this.timeOut = setTimeout(function() { this.onAutoSpin(), this.speed = 400 }.bind(this), this.speed) : this.resetSpin()
            },
            onData: function(t) { void 0 !== t.user && (this.userData(t.user), cc.RedT.userData(t.user)), void 0 !== t.VuongQuocRed && this.VuongQuocRed(t.VuongQuocRed), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu, this.onGetHu()), void 0 !== t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            userData: function(t) { this.taikhoan.string = n.numberWithCommas(t.red) },
            VuongQuocRed: function(t) {
                var e = this;
                void 0 !== t.status && (1 === t.status ? (this.buttonStop.active = !!this.isAuto, this.buttonAuto.active = !this.buttonStop.active, Promise.all(t.cel.map(function(t, i) { Promise.all(t.map(function(t, n) { e.reels[i].icons[n].setIcon(t, !0) })) })), this.runReels(), this.H_line_win = t.line_win, this.H_win = t.win, this.H_free = t.free, this.isBonus = t.isBonus, this.isNoHu = t.isNoHu, this.isBigWin = t.isBigWin, this.isFree = t.isFree, this.isFreeSpin = !!t.free) : this.resetSpin()), void 0 !== t.bonus && this.gameBonus.onData(t.bonus), void 0 !== t.log && this.dialog.history.onData(t.log), void 0 !== t.top && this.dialog.top.onData(t.top), void 0 !== t.notice && this.addNotice(t.notice)
            },
            onGetSpin: function() { cc.RedT.send({ g: { vq_red: { spin: { cuoc: n.getOnlyNumberInString(this.bet.string), line: this.Line.data } } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.nodeNotice.addChild(e)
            },
            backGame: function() { cc.RedT.MiniPanel.node.parent = null, this.loading.active = !0, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame") },
            signOut: function() { cc.RedT.MiniPanel.node.parent = null, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            onGetHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    var e = n.getOnlyNumberInString(this.bet.string);
                    Promise.all(cc.RedT.setting.topHu.data.vq_red.filter(function(t) { return t.type == e })).then(function(e) {
                        var i = n.getOnlyNumberInString(t.hu.string),
                            o = e[0].bet;
                        i - o != 0 && n.numberTo(t.hu, i, o, 2e3, !0)
                    })
                }
            },
            BangThuongToggle: function() { cc.RedT.audio.playClick(), this.bangThuong.active = !this.bangThuong.active }
        }), cc._RF.pop()
    }, { Helper: "Helper", Notice: "Notice", VQRed_dialog: "VQRed_dialog", VuongQuocRed_line: "VuongQuocRed_line", VuongQuocRed_playBonus: "VuongQuocRed_playBonus", VuongQuocRed_reel: "VuongQuocRed_reel" }],
    XoSo_History: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6525embjElLuYUiOmITMU6B", "XoSo_History");
        var n = t("XoSo_MBHistory");
        cc.Class({ extends: cc.Component, properties: { MienBac: n }, onData: function(t) { void 0 !== t.mb && this.MienBac.onData(t.mb) } }), cc._RF.pop()
    }, { XoSo_MBHistory: "XoSo_MBHistory" }],
    XoSo_KetQua: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "05eacVPi8xBKbT1lt1xSw6v", "XoSo_KetQua");
        var n = t("kq_xsmb");
        cc.Class({ extends: cc.Component, properties: { MienBac: n }, onData: function(t) { void 0 !== t.mb && this.MienBac.onData(t.mb) } }), cc._RF.pop()
    }, { kq_xsmb: "kq_xsmb" }],
    XoSo_MBHistory_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ac3343HcChC0o2BYBlNuPKt", "XoSo_MBHistory_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, loai: cc.Label, so: cc.Label, diem: cc.Label, cuoc: cc.Label, win: cc.Label, status: cc.Label } }), cc._RF.pop()
    }, {}],
    XoSo_MBHistory: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "06a9fZAyFBBtKSyOPZt3z5t", "XoSo_MBHistory");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node },
            onLoad: function() {
                var t = this,
                    e = cc.instantiate(this.page);
                e.y = -324, this.node.addChild(e), this.page = e.getComponent("Pagination"), this.page.init(this), Promise.all(this.content.children.map(function(t) { return t.getComponent("XoSo_MBHistory_item") })).then(function(e) { t.content = e }), this.get_data()
            },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { xs: { mb: { history: t } } } }) },
            onData: function(t) {
                var e = this;
                this.page.onSet(t.page, t.kmess, t.total), this.content.forEach(function(i, o) {
                    var c = t.data[o];
                    void 0 !== c ? (i.node.active = !0, i.bg.active = o % 2, i.time.string = n.getStringDateByTime(c.time), i.loai.string = e.getLoai(c.type), i.so.string = c.so.join(", "), i.diem.string = n.numberWithCommas(c.diem), i.cuoc.string = n.numberWithCommas(c.cuoc), i.win.string = n.numberWithCommas(c.win), i.status.string = c.thanhtoan ? "\u0110\xe3 S\u1ed5" : "Ch\u1edd S\u1ed5", i.status.node.color = c.thanhtoan ? cc.color(0, 255, 0, 255) : cc.color(255, 214, 0, 255)) : i.node.active = !1
                })
            },
            getLoai: function(t) {
                switch (t) {
                    case "lo2":
                        return "L\xf4 2 S\u1ed1";
                    case "lo21k":
                        return "L\xf4 2 S\u1ed1 1k";
                    case "lo3":
                        return "L\xf4 3 S\u1ed1";
                    case "lo4":
                        return "L\xf4 4 S\u1ed1";
                    case "xien2":
                        return "Xi\xean 2";
                    case "xien3":
                        return "Xi\xean 3";
                    case "xien4":
                        return "Xi\xean 4";
                    case "de":
                        return "\u0110\u1ec1";
                    case "daude":
                        return "\u0110\u1ea7u \u0110\u1ec1";
                    case "degiai7":
                        return "\u0110\u1ec1 Gi\u1ea3i 7";
                    case "degiai1":
                        return "\u0110\u1ec1 Gi\u1ea3i Nh\u1ea5t";
                    case "3cang":
                        return "3 C\xe0ng";
                    case "4cang":
                        return "4 C\xe0ng";
                    case "dau":
                        return "\u0110\u1ea7u";
                    case "duoi":
                        return "\u0110u\xf4i";
                    case "truot4":
                        return "Tr\u01b0\u1ee3t 4";
                    case "truot8":
                        return "Tr\u01b0\u1ee3t 8";
                    case "truot10":
                        return "Tr\u01b0\u1ee3t 10"
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    XoSo_Main_Main: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e57d5GbJYdPJaTehdXI/JqM", "XoSo_Main_Main");
        var n = t("Helper").numberPad;
        cc.Class({
            extends: cc.Component,
            properties: { time_mb: cc.Label },
            update: function(t) {
                var e = new Date;
                e.setHours(18, 0, 0, 0, 0);
                var i = (e = e.getTime()) - (new Date).getTime();
                if (i < 0) this.time_mb.string = "";
                else {
                    var o = Math.floor(i % 864e5 / 36e5),
                        c = Math.floor(i % 36e5 / 6e4),
                        s = Math.floor(i % 6e4 / 1e3);
                    this.time_mb.string = n(o, 2) + ":" + n(c, 2) + ":" + n(s, 2)
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    XoSo_Main: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "949d6KzSglCXrlqSMpvyQvX", "XoSo_Main");
        var n = t("XoSo_History"),
            o = t("XoSo_KetQua");
        cc.Class({ extends: cc.Component, properties: { right: cc.Node, History: n, KetQua: o }, init: function(t) { this.RedT = t }, showMain: function() { this.right.children.forEach(function(t) { "Main" === t.name ? t.active = !0 : t.active = !1 }) }, onHistoryClick: function(t, e) { this.RedT.position = "History", this.right.children.forEach(function(t) { "History" === t.name ? (t.active = !0, t.children.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 })) : t.active = !1 }) }, onKetQuaClick: function(t, e) { this.RedT.position = "KetQua", this.right.children.forEach(function(t) { "KetQua" === t.name ? (t.active = !0, t.children.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 })) : t.active = !1 }) } }), cc._RF.pop()
    }, { XoSo_History: "XoSo_History", XoSo_KetQua: "XoSo_KetQua" }],
    XoSo_MienBac: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "479d04nY+1D8at8J2cAuNJP", "XoSo_MienBac"), cc.Class({
            extends: cc.Component,
            properties: { header: cc.Node, body: cc.Node },
            onSelectType: function(t) {
                var e = t.target.name;
                this.header.children.forEach(function(t) { t.name === e ? (t.pauseSystemEvents(), t.opacity = 255) : (t.resumeSystemEvents(), t.opacity = 99) }), this.body.children.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 })
            }
        }), cc._RF.pop()
    }, {}],
    XoSo_select_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "61675TPqG5KgLFHTaCss4/w", "XoSo_select_item"), cc.Class({ extends: cc.Component, properties: { nodeOn: cc.Node, nodeOff: cc.Node, text: cc.Label, select: !1 }, init: function(t) { this.RedT = t }, onChanger: function() { this.select = !this.select, this.nodeOn.active = this.select, this.nodeOff.active = !this.select }, onClickSelect: function() { this.onChanger(), this.RedT.refreshH(this) }, selectOn: function() { this.select = !0, this.nodeOn.active = !0, this.nodeOff.active = !1 }, selectOff: function() { this.select = !1, this.nodeOn.active = !1, this.nodeOff.active = !0 } }), cc._RF.pop()
    }, {}],
    XoSo: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "69933PZVIFBOZhrxWlp0GLT", "XoSo");
        var n = t("Helper"),
            o = t("Notice"),
            c = t("XoSo_Main");
        cc.Class({
            extends: cc.Component,
            properties: { redhat: cc.Node, balans: cc.Label, username: cc.Label, today: cc.Label, nodeNotice: cc.Node, prefabNotice: cc.Prefab, loading: cc.Node, notice: o, XoSo_Main: c, games: cc.Node, position: "" },
            onLoad: function() { cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat, cc.RedT.send({ scene: "xo_so" }), this.username.string = cc.RedT.user.name, this.balans.string = n.numberWithCommas(cc.RedT.user.red), this.XoSo_Main.init(this) },
            onData: function(t) { void 0 !== t.user && (this.userData(t.user), cc.RedT.userData(t.user)), void 0 !== t.XoSo && this.XoSo(t.XoSo), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu), void 0 !== t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.notice && this.notice.show(t.notice), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            XoSo: function(t) { void 0 !== t.notice && this.addNotice(t.notice), void 0 !== t.history && this.XoSo_Main.History.onData(t.history), void 0 !== t.kq && this.XoSo_Main.KetQua.onData(t.kq) },
            userData: function(t) { this.balans.string = n.numberWithCommas(t.red) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.nodeNotice.addChild(e)
            },
            backGame: function() {
                switch (this.position) {
                    case "Main":
                        cc.RedT.MiniPanel.node.parent = null, this.loading.active = !0, cc.director.loadScene("MainGame");
                        break;
                    case "MienBac":
                        this.onSelectDat(null, "Main");
                        break;
                    case "History":
                    case "KetQua":
                        this.XoSo_Main.showMain(), this.onSelectDat(null, "Main")
                }
            },
            signOut: function() { cc.RedT.MiniPanel.node.parent = null, cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            update: function() {
                var t = new Date;
                this.today.string = this.day(t.getDay()) + " " + n.addZero10(t.getDate()) + "/" + n.addZero10(t.getMonth() + 1) + "/" + t.getFullYear() + " " + n.addZero10(t.getHours()) + ":" + n.addZero10(t.getMinutes()) + ":" + n.addZero10(t.getSeconds())
            },
            day: function(t) { var e = new Array(7); return e[0] = "CN", e[1] = "T2", e[2] = "T3", e[3] = "T4", e[4] = "T5", e[5] = "T6", e[6] = "T7", e[t] },
            onSelectDat: function(t, e) { this.position = e, this.games.children.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 }) }
        }), cc._RF.pop()
    }, { Helper: "Helper", Notice: "Notice", XoSo_Main: "XoSo_Main" }],
    XocXoc_dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c4aaeEmL4tMTYKZKZDHN9hV", "XocXoc_dialog");
        var n = t("XocXoc_history"),
            o = t("XocXoc_top");
        cc.Class({ extends: cc.Component, properties: { history: n, top: o }, init: function() { this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showHistory: function() { this.node.active = this.history.node.active = !0, this.objShow = this.history.node }, showTop: function() { this.node.active = this.top.node.active = !0, this.objShow = this.top.node } }), cc._RF.pop()
    }, { XocXoc_history: "XocXoc_history", XocXoc_top: "XocXoc_top" }],
    XocXoc_history_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "281e41bbTJA6rvy6BRfTh1a", "XocXoc_history_item"), cc.Class({ extends: cc.Component, properties: { bg: cc.Node, time: cc.Label, phien: cc.Label, kqSprite: cc.Sprite, kqLabel: cc.Label, chan: cc.Label, le: cc.Label, red3: cc.Label, red4: cc.Label, white3: cc.Label, white4: cc.Label, win: cc.Label } }), cc._RF.pop()
    }, {}],
    XocXoc_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "358d0RyfQlNvKbc/4deKLy1", "XocXoc_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, cointRed: cc.Node, cointXu: cc.Node, iconRed: cc.SpriteFrame, iconWhite: cc.SpriteFrame, red: !0 },
            onLoad: function() {
                var t = this,
                    e = cc.instantiate(this.page);
                e.y = -263, this.node.addChild(e), this.page = e.getComponent("Pagination"), Promise.all(this.content.children.map(function(t) { return t.getComponent("XocXoc_history_item") })).then(function(e) { t.content = e }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { xocxoc: { log: { red: this.red, page: t } } } }) },
            changerCoint: function() { this.red = !this.red, this.cointRed.active = !this.cointRed.active, this.cointXu.active = !this.cointXu.active, this.get_data() },
            onData: function(t) {
                var e = this;
                this.page.onSet(t.page, t.kmess, t.total), Promise.all(this.content.map(function(i, o) {
                    var c = t.data[o];
                    if (void 0 !== c) {
                        i.node.active = !0, i.bg.active = o % 2, i.time.string = n.getStringDateByTime(c.time), i.phien.string = c.phien;
                        var s = 0;
                        c.kq.forEach(function(t) { t && s++ }), i.kqSprite.spriteFrame = 0 === s ? e.iconRed : s % 2 ? e.iconRed : e.iconWhite, i.kqLabel.string = 0 === s ? 4 : s, i.chan.string = n.numberWithCommas(c.chan), i.le.string = n.numberWithCommas(c.le), i.red3.string = n.numberWithCommas(c.red3), i.red4.string = n.numberWithCommas(c.red4), i.white3.string = n.numberWithCommas(c.white3), i.white4.string = n.numberWithCommas(c.white4), i.win.string = n.numberWithCommas(c.betwin), s % 2 ? (i.le.node.color = cc.Color.YELLOW, i.chan.node.color = cc.Color.WHITE) : (i.chan.node.color = cc.Color.YELLOW, i.le.node.color = cc.Color.WHITE), i.white4.node.color = 0 === s ? cc.Color.YELLOW : cc.Color.WHITE, i.white3.node.color = 1 === s ? cc.Color.YELLOW : cc.Color.WHITE, i.red3.node.color = 3 === s ? cc.Color.YELLOW : cc.Color.WHITE, i.red4.node.color = 4 === s ? cc.Color.YELLOW : cc.Color.WHITE
                    } else i.node.active = !1
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    XocXoc_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b5de3R6mw5PGbEgZCU2QLsG", "XocXoc_top"), cc.Class({ extends: cc.Component, properties: {}, start: function() {} }), cc._RF.pop()
    }, {}],
    XocXoc: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "24723lmj75OaaA5CAEsELDw", "XocXoc");
        var n = t("Helper"),
            o = t("Notice"),
            c = t("XocXoc_dialog");
        cc.Class({
            extends: cc.Component,
            properties: { audioMoBat: cc.AudioSource, audioSingleChip: cc.AudioSource, audioMultiChip: cc.AudioSource, audioXocDia: cc.AudioSource, audioMultiChip2: cc.AudioSource, audioMultiChip3: cc.AudioSource, audioMultiChip4: cc.AudioSource, audioMultiChip5: cc.AudioSource, box_chan: cc.Node, box_le: cc.Node, box_red3: cc.Node, box_red4: cc.Node, box_white3: cc.Node, box_white4: cc.Node, total_chan: cc.Label, total_le: cc.Label, total_red3: cc.Label, total_red4: cc.Label, total_white3: cc.Label, total_white4: cc.Label, me_chan: cc.Label, me_le: cc.Label, me_red3: cc.Label, me_red4: cc.Label, me_white3: cc.Label, me_white4: cc.Label, me_name: cc.Label, me_balans: cc.Label, labelTime: cc.Label, timeWait: cc.Label, nodeWait: cc.Node, box_chip: cc.Node, users_bg: cc.Node, users_count: cc.Label, nodeBat: cc.Node, chip_1000: cc.SpriteFrame, chip_10000: cc.SpriteFrame, chip_50000: cc.SpriteFrame, chip_100000: cc.SpriteFrame, chip_1000000: cc.SpriteFrame, dot_red: cc.SpriteFrame, dot_white: cc.SpriteFrame, dot: { default: [], type: cc.Sprite }, log_chan: cc.Label, log_le: cc.Label, log_top: cc.Node, logMain: cc.Node, redH: cc.Node, miniNotice: cc.Node, Animation: cc.Animation, prefabNotice: cc.Prefab, bet: cc.Node, loading: cc.Node, notice: o, dialog: c },
            ctor: function() { this.logs = [], this.nan = !1, this.cuoc = "1000", this.actionBatOpen = cc.moveTo(.5, cc.v2(121, 222)), this.actionBatClose = cc.sequence(cc.callFunc(function() { this.resetData() }, this), cc.moveTo(.5, cc.v2(0, 0)), cc.delayTime(.5), cc.callFunc(function() { this.audioXocDia.play(), this.Animation.play() }, this)), this.maxDot = { x: 39, y: 19 }, this.maxBox1_3 = { x: -10, y: 0 }, this.maxBox1_1 = { x: -10, y: 0 }, this.clients = { red: { chan: 0, le: 0, red3: 0, red4: 0, white3: 0, white4: 0 } }, this.users = { red: { chan: 0, le: 0, red3: 0, red4: 0, white3: 0, white4: 0 } } },
            onLoad: function() {
                cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redH, this.logMain = this.logMain.children.map(function(t) { return t.children[0].getComponent(cc.Sprite) }), this.logMain.reverse(), this.log_top = this.log_top.children.map(function(t) {
                    var e = { cell: t },
                        i = t.children.map(function(t) { return { c: t.children[0].getComponent(cc.Sprite), t: t.children[1].getComponent(cc.Label) } });
                    return i.reverse(), e.data = i, e
                }), this.log_top.reverse(), this.me_name.string = cc.RedT.user.name, this.me_balans.string = n.numberWithCommas(cc.RedT.user.red), cc.RedT.send({ scene: "xocxoc", g: { xocxoc: { ingame: !0 } } })
            },
            onData: function(t) { void 0 !== t.user && (this.userData(t.user), cc.RedT.userData(t.user)), void 0 !== t.xocxoc && this.xocxoc(t.xocxoc), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu), void 0 !== t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            backGame: function() { cc.RedT.MiniPanel.node.parent = null, clearInterval(this.timeInterval), cc.RedT.send({ g: { xocxoc: { outgame: !0 } } }), this.loading.active = !0, clearTimeout(this.timeOut), clearTimeout(this.regTimeOut1), clearTimeout(this.regTimeOut2), clearTimeout(this.regTimeOut3), cc.director.loadScene("MainGame") },
            signOut: function() { cc.RedT.MiniPanel.node.parent = null, clearInterval(this.timeInterval), clearTimeout(this.timeOut), clearTimeout(this.regTimeOut1), clearTimeout(this.regTimeOut2), clearTimeout(this.regTimeOut3), cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            userData: function(t) { this.me_balans.string = n.numberWithCommas(t.red) },
            xocxoc: function(t) { t.ingame && this.xocxocIngame(t.ingame), t.finish && this.xocxocFinish(t.finish), t.history && this.dialog.history.onData(t.history), t.top, t.status && this.status(t.status), t.chip && this.clientsChip(t.chip), t.mechip && this.meChip(t.mechip), t.client && this.updateClient(t.client), t.me && this.updateMe(t.me), void 0 !== t.notice && this.addNotice(t.notice) },
            xocxocIngame: function(t) { t.client && this.countClient(t.client), t.chip && this.ingameChip(t.chip), t.time && (this.time_remain = t.time - 1, this.playTime(), this.time_remain > 32 && t.logs.length && (this.nodeBat.position = cc.v2(0, 246), this.setDot([t.logs[0].red1, t.logs[0].red2, t.logs[0].red3, t.logs[0].red4]))), t.data && this.updateData(t.data), t.logs && (this.logs = t.logs, this.setLogs()), t.me && this.updateMe(t.me), t.chats },
            ingameChip: function(t) {
                for (var e = 0, i = Object.entries(t); e < i.length; e++) {
                    var n = i[e],
                        o = n[0],
                        c = n[1],
                        s = this.maxBox1_3;
                    switch (t.box) {
                        case "chan":
                        case "le":
                            s = this.maxBox1_1
                    }
                    for (var a = 0, h = Object.entries(c); a < h.length; a++) {
                        var r = h[a],
                            d = r[0],
                            u = r[1];
                        if (u > 0)
                            for (; u;) {
                                var l = Math.random() * (s.x + 1) >> 0,
                                    p = Math.random() * (s.y + 1) >> 0,
                                    g = new cc.Node;
                                (g = g.addComponent(cc.Sprite)).spriteFrame = this["chip_" + d], g.node.position = cc.v2(l, p), g.node.scale = .3, this["box_" + o].children[1].addChild(g.node), u--
                            }
                    }
                }
            },
            xocxocFinish: function(t) {
                var e = { red1: t[0], red2: t[1], red3: t[2], red4: t[3] };
                this.logs.unshift(e), this.logs.length > 48 && this.logs.pop(), this.setDot(t), this.labelTime.node.active = !1, this.time_remain = 43, this.playTime(), this.nan || this.FinishTT()
            },
            FinishTT: function() { this.audioMoBat.play(), this.nodeBat.runAction(cc.sequence(this.actionBatOpen, cc.callFunc(this.showKQ, this), cc.delayTime(1), cc.callFunc(this.showKQ2, this))), this.setLogs() },
            showKQ: function() {
                var t = 0;
                switch (Object.values(this.logs[0]).forEach(function(e) { e && t++ }), t % 2 ? this.box_le.children[0].active = !0 : this.box_chan.children[0].active = !0, t) {
                    case 0:
                        this.box_white4.children[0].active = !0;
                        break;
                    case 1:
                        this.box_white3.children[0].active = !0;
                        break;
                    case 3:
                        this.box_red3.children[0].active = !0;
                        break;
                    case 4:
                        this.box_red4.children[0].active = !0
                }
            },
            showKQ2: function() {
                var t = 0,
                    e = 0,
                    i = null,
                    n = null,
                    o = 0;
                Object.values(this.logs[0]).forEach(function(t) { t && o++ });
                var c = this.box_chip.parent.convertToWorldSpaceAR(this.box_chip.position),
                    s = null;
                o % 2 ? (i = this.box_le.children[1], t += this.box_chan.children[1].children.length, s = this.box_chan.children[1].convertToNodeSpaceAR(c), this.box_chan.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, s))) })) : (i = this.box_chan.children[1], t += this.box_le.children[1].children.length, s = this.box_le.children[1].convertToNodeSpaceAR(c), this.box_le.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, s))) }));
                var a = this.box_red3.children[1].convertToNodeSpaceAR(c),
                    h = this.box_red4.children[1].convertToNodeSpaceAR(c),
                    r = this.box_white3.children[1].convertToNodeSpaceAR(c),
                    d = this.box_white4.children[1].convertToNodeSpaceAR(c);
                switch (o) {
                    case 0:
                        n = this.box_white4.children[1], t += this.box_red3.children[1].children.length + this.box_red4.children[1].children.length + this.box_white3.children[1].children.length, this.box_red3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, a))) }), this.box_red4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, h))) }), this.box_white3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, r))) });
                        break;
                    case 1:
                        n = this.box_white3.children[1], t += this.box_red3.children[1].children.length + this.box_red4.children[1].children.length + this.box_white4.children[1].children.length, this.box_red3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, a))) }), this.box_red4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, h))) }), this.box_white4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, d))) });
                        break;
                    case 2:
                        t += this.box_red3.children[1].children.length + this.box_red4.children[1].children.length + this.box_white3.children[1].children.length + this.box_white4.children[1].children.length, this.box_red3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, a))) }), this.box_red4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, h))) }), this.box_white3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, d))) }), this.box_white4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, d))) });
                        break;
                    case 3:
                        n = this.box_red3.children[1], t += this.box_white3.children[1].children.length + this.box_red4.children[1].children.length + this.box_white4.children[1].children.length, this.box_white3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, r))) }), this.box_red4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, h))) }), this.box_white4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, d))) });
                        break;
                    case 4:
                        n = this.box_red4.children[1], t += this.box_white3.children[1].children.length + this.box_red3.children[1].children.length + this.box_white4.children[1].children.length, this.box_white3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, r))) }), this.box_red3.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, a))) }), this.box_white4.children[1].children.forEach(function(t) { t.runAction(cc.spawn(cc.scaleTo(.4, .5), cc.moveTo(.4, d))) })
                }
                t && this.audioMultiChip.play(), this.regTimeOut1 = setTimeout(function() {
                    if (e += i.children.length, i.children.forEach(function(t) {
                            var e = cc.instantiate(t);
                            e.position = s, e.scale = .5;
                            var n = Math.random() * (this.maxBox1_1.x + 1) >> 0,
                                o = Math.random() * (this.maxBox1_1.y + 1) >> 0;
                            i.addChild(e), e.runAction(cc.sequence(cc.spawn(cc.scaleTo(.4, .3), cc.moveTo(.4, cc.v2(n, o))), cc.sequence(cc.moveTo(.1, cc.v2(n, o - 6)), cc.moveTo(.1, cc.v2(n, o)))))
                        }.bind(this)), n) {
                        e += n.children.length;
                        var t = n.convertToNodeSpaceAR(c);
                        n.children.forEach(function(e) {
                            var i = cc.instantiate(e);
                            i.position = t, i.scale = .5;
                            var o = Math.random() * (this.maxBox1_3.x + 1) >> 0,
                                c = Math.random() * (this.maxBox1_3.y + 1) >> 0;
                            n.addChild(i), i.runAction(cc.sequence(cc.spawn(cc.scaleTo(.4, .3), cc.moveTo(.4, cc.v2(o, c))), cc.sequence(cc.moveTo(.1, cc.v2(o, c - 6)), cc.moveTo(.1, cc.v2(o, c)))))
                        }.bind(this))
                    }
                    e && [1, 2, 3, 4, 5].forEach(function(t) { 1 !== t ? this["audioMultiChip" + t].play() : this.audioMultiChip.play() }.bind(this)), this.regTimeOut2 = setTimeout(function() {
                        var t = this.users_bg.parent.convertToWorldSpaceAR(this.users_bg.position),
                            e = i.convertToNodeSpaceAR(t);
                        if (i.children.forEach(function(t) { t.runAction(cc.spawn(cc.fadeTo(.4, 0), cc.moveTo(.4, e))) }), n) {
                            var o = n.convertToNodeSpaceAR(t);
                            n.children.forEach(function(t) { t.runAction(cc.spawn(cc.fadeTo(.4, 0), cc.moveTo(.4, o))) })
                        }
                    }.bind(this), 3e3)
                }.bind(this), 1500)
            },
            setDot: function(t) {
                var e = Math.random() * (this.maxDot.x + 1) >> 0,
                    i = Math.random() * (this.maxDot.y + 1) >> 0,
                    n = i - e;
                n > 22 && (i -= i / 1.4), this.dot[0].node.position = cc.v2(e, i), e = Math.random() * (this.maxDot.x + 1) >> 0, (n = (i = Math.random() * (this.maxDot.y + 1) >> 0) - e) > 22 && (i -= i / 1.4), this.dot[1].node.position = cc.v2(e, i), e = Math.random() * (this.maxDot.x + 1) >> 0, (n = (i = Math.random() * (this.maxDot.y + 1) >> 0) - e) > 22 && (i -= i / 1.4), this.dot[2].node.position = cc.v2(e, i), e = Math.random() * (this.maxDot.x + 1) >> 0, (n = (i = Math.random() * (this.maxDot.y + 1) >> 0) - e) > 22 && (i -= i / 1.4), this.dot[3].node.position = cc.v2(e, i), this.dot.forEach(function(e, i) {
                    var n = t[i];
                    e.spriteFrame = n ? this.dot_red : this.dot_white
                }.bind(this))
            },
            playTime: function() {
                void 0 !== this.timeInterval && clearInterval(this.timeInterval), this.timeInterval = setInterval(function() {
                    if (this.time_remain > 32) {
                        var t = n.numberPad(this.time_remain - 33, 2);
                        this.timeWait.string = t, this.labelTime.node.active = !1, this.nodeWait.active = !0
                    } else if (this.time_remain > 30) this.labelTime.node.active = !1, this.nodeWait.active = !1, 32 === this.time_remain && this.nodeBat.runAction(this.actionBatClose);
                    else if (this.time_remain > -1) {
                        t = n.numberPad(this.time_remain, 2);
                        this.labelTime.node.active = !0, this.nodeWait.active = !1, this.labelTime.string = t, this.time_remain < 11 ? this.labelTime.node.color = cc.Color.RED : this.labelTime.node.color = cc.Color.WHITE
                    } else clearInterval(this.timeInterval);
                    this.time_remain--
                }.bind(this), 1e3)
            },
            countClient: function(t) { this.users_count.string = t },
            updateData: function(t) { this.total_chan.string = t.red.chan > 0 ? n.numberWithCommas(t.red.chan) : "", this.total_le.string = t.red.le > 0 ? n.numberWithCommas(t.red.le) : "", this.total_red3.string = t.red.red3 > 0 ? n.numberWithCommas(t.red.red3) : "", this.total_red4.string = t.red.red4 > 0 ? n.numberWithCommas(t.red.red4) : "", this.total_white3.string = t.red.white3 > 0 ? n.numberWithCommas(t.red.white3) : "", this.total_white4.string = t.red.white4 > 0 ? n.numberWithCommas(t.red.white4) : "" },
            resetData: function() { this.box_chan.children[1].destroyAllChildren(), this.box_le.children[1].destroyAllChildren(), this.box_white4.children[1].destroyAllChildren(), this.box_white3.children[1].destroyAllChildren(), this.box_red3.children[1].destroyAllChildren(), this.box_red4.children[1].destroyAllChildren(), this.box_chan.children[0].active = !1, this.box_le.children[0].active = !1, this.box_white4.children[0].active = !1, this.box_white3.children[0].active = !1, this.box_red3.children[0].active = !1, this.box_red4.children[0].active = !1, this.total_chan.string = "", this.total_le.string = "", this.total_red3.string = "", this.total_red4.string = "", this.total_white3.string = "", this.total_white4.string = "", this.me_chan.string = "", this.me_le.string = "", this.me_red3.string = "", this.me_red4.string = "", this.me_white3.string = "", this.me_white4.string = "", this.users.red.chan = 0, this.users.red.le = 0, this.users.red.red3 = 0, this.users.red.red4 = 0, this.users.red.white3 = 0, this.users.red.white4 = 0, this.clients.red.chan = 0, this.clients.red.le = 0, this.clients.red.red3 = 0, this.clients.red.red4 = 0, this.clients.red.white3 = 0, this.clients.red.white4 = 0 },
            setLogs: function() {
                var t = this;
                this.logMain.forEach(function(e, i) {
                    var n = t.logs[i];
                    if (n) {
                        e.node.active = !0;
                        var o = 0;
                        (n = Object.values(n)).forEach(function(t) { t && o++ }), e.spriteFrame = o % 2 ? t.dot_red : t.dot_white
                    } else e.node.active = !1
                });
                var e = -1,
                    i = [],
                    n = [],
                    o = 0,
                    c = 0,
                    s = t.logs.slice();
                s.reverse(), s.forEach(function(t) {
                    var o = 0;
                    Object.values(t).forEach(function(t) { t && o++ });
                    var c = !(o % 2); - 1 === e && (e = c), (c !== e || n.length > 3) && (e = c, i.push(n), n = []), c === e && n.push(o)
                }), i.push(n), i.reverse(), i = i.slice(0, 12), this.log_top.forEach(function(e, n) {
                    var s = i[n];
                    s ? (e.cell.active = !0, e.data.forEach(function(e, i) {
                        var n = s[i];
                        void 0 !== n ? (e.c.node.parent.active = !0, e.c.spriteFrame = n % 2 ? t.dot_red : 4 === n ? t.dot_red : t.dot_white, e.t.string = 0 === n ? 4 : n, n % 2 ? c++ : o++) : e.c.node.parent.active = !1
                    })) : e.cell.active = !1
                }), this.log_chan.string = o, this.log_le.string = c
            },
            changerBet: function(t, e) {
                var i = t.target;
                this.cuoc = i.name, this.bet.children.forEach(function(t) { t == i ? (t.children[0].active = !1, t.children[1].active = !0, t.pauseSystemEvents(), t.opacity = 255) : (t.children[0].active = !0, t.children[1].active = !1, t.resumeSystemEvents(), t.opacity = 99) })
            },
            onCuoc: function(t, e) { cc.RedT.send({ g: { xocxoc: { cuoc: { cuoc: this.cuoc, box: e } } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.miniNotice.addChild(e)
            },
            clientsChip: function(t) {
                var e = null,
                    i = this.maxBox1_3;
                switch (t.box) {
                    case "chan":
                        e = this.box_chan, i = this.maxBox1_1;
                        break;
                    case "le":
                        e = this.box_le, i = this.maxBox1_1;
                        break;
                    case "red3":
                        e = this.box_red3;
                        break;
                    case "red4":
                        e = this.box_red4;
                        break;
                    case "white3":
                        e = this.box_white3;
                        break;
                    case "white4":
                        e = this.box_white4
                }
                var n = this.users_bg.parent.convertToWorldSpaceAR(this.users_bg.position);
                n = e.children[1].convertToNodeSpaceAR(n);
                var o = new cc.Node;
                (o = o.addComponent(cc.Sprite)).spriteFrame = this["chip_" + t.cuoc], o.node.position = n, o.node.scale = .67;
                var c = Math.random() * (i.x + 1) >> 0,
                    s = Math.random() * (i.y + 1) >> 0;
                e.children[1].addChild(o.node);
                var a = cc.instantiate(this.audioSingleChip.node);
                o.node.addChild(a), a = a.getComponent(cc.AudioSource), o.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.4, .3), cc.moveTo(.4, cc.v2(c, s))), cc.callFunc(function() { this.play() }, a), cc.sequence(cc.moveTo(.1, cc.v2(c, s - 6)), cc.moveTo(.1, cc.v2(c, s)))))
            },
            meChip: function(t) {
                var e = null,
                    i = null,
                    n = this.maxBox1_3;
                switch (this.bet.children.forEach(function(i) { i.name == t.cuoc && (e = i) }), t.box) {
                    case "chan":
                        i = this.box_chan, n = this.maxBox1_1;
                        break;
                    case "le":
                        i = this.box_le, n = this.maxBox1_1;
                        break;
                    case "red3":
                        i = this.box_red3;
                        break;
                    case "red4":
                        i = this.box_red4;
                        break;
                    case "white3":
                        i = this.box_white3;
                        break;
                    case "white4":
                        i = this.box_white4
                }
                var o = e.parent.convertToWorldSpaceAR(e.position);
                o = i.children[1].convertToNodeSpaceAR(o);
                var c = new cc.Node;
                (c = c.addComponent(cc.Sprite)).spriteFrame = this["chip_" + t.cuoc], c.node.position = o;
                var s = Math.random() * (n.x + 1) >> 0,
                    a = Math.random() * (n.y + 1) >> 0;
                i.children[1].addChild(c.node);
                var h = cc.instantiate(this.audioSingleChip.node);
                c.node.addChild(h), h = h.getComponent(cc.AudioSource), c.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, .3), cc.moveTo(.3, cc.v2(s, a))), cc.callFunc(function() { this.play() }, h), cc.sequence(cc.moveTo(.1, cc.v2(s, a + 6)), cc.moveTo(.1, cc.v2(s, a)))))
            },
            updateMe: function(t) { t.red && this.updateMeRed(t.red) },
            updateMeRed: function(t) { t.chan > 0 && (this.users.red.chan = t.chan, this.me_chan.string = n.numberWithCommas(t.chan)), t.le > 0 && (this.users.red.le = t.le, this.me_le.string = n.numberWithCommas(t.le)), t.red3 > 0 && (this.users.red.red3 = t.red3, this.me_red3.string = n.numberWithCommas(t.red3)), t.red4 > 0 && (this.users.red.red4 = t.red4, this.me_red4.string = n.numberWithCommas(t.red4)), t.white3 > 0 && (this.users.red.white3 = t.white3, this.me_white3.string = n.numberWithCommas(t.white3)), t.white4 > 0 && (this.users.red.white4 = t.white4, this.me_white4.string = n.numberWithCommas(t.white4)) },
            updateClient: function(t) { t.red && this.updateClientRed(t.red) },
            updateClientRed: function(t) { t.chan > 0 && (this.clients.red.chan = t.chan, this.total_chan.string = n.numberWithCommas(t.chan)), t.le > 0 && (this.clients.red.le = t.le, this.total_le.string = n.numberWithCommas(t.le)), t.red3 > 0 && (this.clients.red.red3 = t.red3, this.total_red3.string = n.numberWithCommas(t.red3)), t.red4 > 0 && (this.clients.red.red4 = t.red4, this.total_red4.string = n.numberWithCommas(t.red4)), t.white3 > 0 && (this.clients.red.white3 = t.white3, this.total_white3.string = n.numberWithCommas(t.white3)), t.white4 > 0 && (this.clients.red.white4 = t.white4, this.total_white4.string = n.numberWithCommas(t.white4)) },
            updateMeCoint: function() { this.me_chan.string = this.users.red.chan > 0 ? n.numberWithCommas(this.users.red.chan) : "", this.me_le.string = this.users.red.le > 0 ? n.numberWithCommas(this.users.red.le) : "", this.me_red3.string = this.users.red.red3 > 0 ? n.numberWithCommas(this.users.red.red3) : "", this.me_red4.string = this.users.red.red4 > 0 ? n.numberWithCommas(this.users.red.red4) : "", this.me_white3.string = this.users.red.white3 > 0 ? n.numberWithCommas(this.users.red.white3) : "", this.me_white4.string = this.users.red.white4 > 0 ? n.numberWithCommas(this.users.red.white4) : "", this.total_chan.string = this.clients.red.chan > 0 ? n.numberWithCommas(this.clients.red.chan) : "", this.total_le.string = this.clients.red.le > 0 ? n.numberWithCommas(this.clients.red.le) : "", this.total_red3.string = this.clients.red.red3 > 0 ? n.numberWithCommas(this.clients.red.red3) : "", this.total_red4.string = this.clients.red.red4 > 0 ? n.numberWithCommas(this.clients.red.red4) : "", this.total_white3.string = this.clients.red.white3 > 0 ? n.numberWithCommas(this.clients.red.white3) : "", this.total_white4.string = this.clients.red.white4 > 0 ? n.numberWithCommas(this.clients.red.white4) : "" },
            status: function(t) {
                this.regTimeOut3 = setTimeout(function() {
                    var e = new cc.Node;
                    if (e.addComponent(cc.Label), (e = e.getComponent(cc.Label)).string = (t.win ? "+" : "-") + n.numberWithCommas(t.bet), e.font = t.win ? cc.RedT.util.fontCong : cc.RedT.util.fontTru, e.lineHeight = 130, e.fontSize = 25, e.node.position = cc.v2(0, 90), this.miniNotice.addChild(e.node), e.node.runAction(cc.sequence(cc.moveTo(4, cc.v2(0, 200)), cc.callFunc(function() { this.node.destroy() }, e))), t.win && cc.RedT.send({ user: { updateCoint: !0 } }), void 0 !== t.thuong && t.thuong > 0) {
                        var i = new cc.Node;
                        i.addComponent(cc.Label), (i = i.getComponent(cc.Label)).string = "+" + n.numberWithCommas(t.thuong), i.font = cc.RedT.util.fontEffect, i.lineHeight = 90, i.fontSize = 14, this.miniNotice.addChild(i.node), i.node.runAction(cc.sequence(cc.moveTo(4, cc.v2(0, 100)), cc.callFunc(function() { this.node.destroy() }, i)))
                    }
                }.bind(this), 4e3)
            }
        }), cc._RF.pop()
    }, { Helper: "Helper", Notice: "Notice", XocXoc_dialog: "XocXoc_dialog" }],
    Zeus_bonus_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5376cdGTVFIuqMFTNt39vh0", "Zeus_bonus_item"), cc.Class({ extends: cc.Component, properties: { open: cc.Node, close: cc.Node, text: cc.Label } }), cc._RF.pop()
    }, {}],
    Zeus_dialog: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7db485hEaZD25qyYumOc6Cn", "Zeus_dialog");
        var n = t("Zeus_history"),
            o = t("Zeus_top");
        cc.Class({ extends: cc.Component, properties: { history: n, top: o, help: cc.Node }, init: function() { this.actionShow = cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(.5, 255)), this.objShow = null, this.objTmp = null }, onClickBack: function() { cc.RedT.audio.playUnClick(), this.onBack() }, onBack: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = !1, this.node.active = !1, this.objShow = null) : (this.objTmp = this.objShow, this.objShow = this.objShow.previous, this.objTmp.previous = null, this.objTmp.active = !1, this.objShow.active = !0, this.objTmp = null) : this.node.active = !1 }, onClosePrevious: function(t) { void 0 !== t.previous && null !== t.previous && (this.onClosePrevious(t.previous), delete t.previous), t.active = !1 }, onCloseDialog: function() { null != this.objShow ? void 0 == this.objShow.previous || null == this.objShow.previous ? (this.objShow.active = this.node.active = !1, this.objShow = null) : (this.onClosePrevious(this.objShow.previous), this.objShow.active = this.node.active = !1, delete this.objShow.previous, this.objShow = null) : this.node.active = !1 }, resetSizeDialog: function(t) { t.stopAllActions(), t.scale = .5, t.opacity = 0 }, showHistory: function() { this.node.active = this.history.node.active = !0, this.objShow = this.history.node }, showTop: function() { this.node.active = this.top.node.active = !0, this.objShow = this.top.node }, showHelp: function() { this.node.active = this.help.active = !0, this.objShow = this.help } }), cc._RF.pop()
    }, { Zeus_history: "Zeus_history", Zeus_top: "Zeus_top" }],
    Zeus_history: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "341aezoH1lK1IIq/VUivU/o", "Zeus_history");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { page: cc.Prefab, content: cc.Node, cointRed: cc.Node, cointXu: cc.Node, red: !0 },
            onLoad: function() {
                var t = this,
                    e = cc.instantiate(this.page);
                e.y = -211, this.node.addChild(e), this.page = e.getComponent("Pagination"), Promise.all(this.content.children.map(function(t) { return t.getComponent("VQRed_history_item") })).then(function(e) { t.content = e }), this.page.init(this)
            },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { zeus: { log: { red: this.red, page: t } } } }) },
            changerCoint: function() { this.red = !this.red, this.cointRed.active = !this.cointRed.active, this.cointXu.active = !this.cointXu.active, this.get_data() },
            onData: function(t) {
                this.page.onSet(t.page, t.kmess, t.total), Promise.all(this.content.map(function(e, i) {
                    var o = t.data[i];
                    void 0 !== o ? (e.node.active = !0, e.time.string = n.getStringDateByTime(o.time), e.phien.string = o.id, e.cuoc.string = n.numberWithCommas(o.bet), e.win.string = o.line + " D\xf2ng", e.line.string = n.numberWithCommas(o.win)) : e.node.active = !1
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Zeus_iline: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "30443fnAb5KgJR22tc+p9NQ", "Zeus_iline"), cc.Class({ extends: cc.Component, properties: { line: cc.Node, ef: !1 }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onShow, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onHidden, this) }, onShow: function() { this.line.active = !0 }, onHidden: function() {!this.ef && (this.line.active = !1) } }), cc._RF.pop()
    }, {}],
    Zeus_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b2ae4rWXqlM36UY11Ju7VVp", "Zeus_item"), cc.Class({
            extends: cc.Component,
            properties: { icons: { default: [], type: cc.Prefab } },
            init: function(t) { this.RedT = t },
            random: function() { var t = 11 * Math.random() >> 0; return this.setIcon(t), t },
            setIcon: function(t, e) {
                void 0 === e && (e = !1), this.node.removeAllChildren();
                var i = cc.instantiate(this.icons[t]);
                i.setScale(cc.v2(.9, .9)), this.node.addChild(i), e && (this.data = t)
            }
        }), cc._RF.pop()
    }, {}],
    Zeus_lines: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4639a8P+AhBMq1Xj46mDYFr", "Zeus_lines");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { lines: cc.Node, mainLines: cc.Node },
            init: function(t) {
                var e = this;
                this.RedT = t;
                Promise.all(this.mainLines.children.map(function(t) { return t.getComponent("Zeus_iline") })).then(function(t) { e.mainLines = t }), this.selectAll(null, "1")
            },
            onOpen: function() { this.node.active = !0 },
            onClose: function() { this.RedT.playClick(), this.node.active && this.data.length < 1 ? this.RedT.notice.show({ title: "C\u1ea2NH B\xc1O", text: "Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng" }) : this.node.active = !1 },
            select: function(t) {
                this.RedT.playClick();
                var e = t.target;
                e.color._val != cc.Color.WHITE._val ? e.color = cc.Color.WHITE : e.color = e.color.fromHEX("#8A8A8A"), this.check()
            },
            check: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) { return t.color._val == cc.Color.WHITE._val ? e + 1 : void 0 })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectChan: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (!(i % 2)) return t.color = cc.Color.WHITE, i;
                    t.color = t.color.fromHEX("#8A8A8A")
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectLe: function() {
                var t = this;
                Promise.all(this.lines.children.map(function(t, e) {
                    var i = e + 1;
                    if (i % 2) return t.color = cc.Color.WHITE, i;
                    t.color = t.color.fromHEX("#8A8A8A")
                })).then(function(e) { Promise.all(e.filter(function(t) { return void 0 !== t })).then(function(e) { t.data = e, t.RedT.labelLine.string = e.length, t.RedT.tong.string = n.numberWithCommas(e.length * n.getOnlyNumberInString(t.RedT.bet.string)) }) })
            },
            selectAll: function(t, e) {
                var i = this;
                Promise.all(this.lines.children.map(function(t, i) { var n = "1" == e; return t.color = n ? cc.Color.WHITE : t.color.fromHEX("#8A8A8A"), n ? i + 1 : void 0 })).then(function(t) { Promise.all(t.filter(function(t, e) { return void 0 !== t })).then(function(t) { i.data = t, i.RedT.labelLine.string = t.length, i.RedT.tong.string = n.numberWithCommas(t.length * n.getOnlyNumberInString(i.RedT.bet.string)) }) })
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Zeus_playBonus: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cc773mHzahMbLekW0+USdGD", "Zeus_playBonus");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { numberBonus: cc.Label, listBox: cc.Node, notice: cc.Node, numberWin: cc.Label, icons: { default: [], type: cc.SpriteFrame } },
            init: function(t) {
                var e = this;
                this.RedT = t, Promise.all(this.listBox.children.map(function(t) { return t.getComponent("Zeus_bonus_item") })).then(function(t) { e.listBox = t })
            },
            onPlay: function(t) { this.reset(), this.node.active = !0, this.numberBonus.string = t },
            onClickBox: function(t) { this.numberBonus.string && (this.RedT.playClick(), this.onSend(t.target.name)) },
            closeNotice: function() { this.notice.active = this.node.active = !1, this.RedT.hieuUng() },
            onData: function(t) {
                if (void 0 !== t.box) {
                    var e = this.listBox[t.box];
                    e.open.active = !0, e.close.active = !1, e.text.string = n.numberWithCommas(t.bet), this.numberBonus.string = t.bonus, this.scheduleOnce(function() { e.open.active = !1 }, 1.5)
                }
                void 0 !== t.win && (this.notice.active = !0, this.numberWin.string = n.numberWithCommas(t.win), this.RedT.vuathang.string = n.numberWithCommas(1 * n.getOnlyNumberInString(this.RedT.vuathang.string) + t.win))
            },
            onSend: function(t) { cc.RedT.send({ g: { zeus: { bonus: { box: t } } } }) },
            reset: function() { Promise.all(this.listBox.map(function(t) { t.open.active = !1, t.close.active = !0, t.text.string = "" })) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Zeus_reel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3ae4e1beQZEMZqnzzUxgnG9", "Zeus_reel"), cc.Class({
            extends: cc.Component,
            init: function(t) {
                var e = this;
                this.RedT = t, this.icons = [];
                var i = this,
                    n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                Promise.all(n.map(function(t, e) { var o = cc.instantiate(i.RedT.icon); return i.node.addChild(o), (o = o.getComponent("Zeus_item")).init(i.RedT), e > 2 && e < n.length - 3 && o.random(), o })).then(function(t) { e.icons = t, e.icons[e.icons.length - 1].setIcon(e.icons[4].random()), e.icons[e.icons.length - 2].setIcon(e.icons[3].random()), e.icons[e.icons.length - 3].setIcon(e.icons[2].random()), e.icons[e.icons.length - 4].setIcon(e.icons[1].random()), e.icons[e.icons.length - 5].setIcon(e.icons[0].random()) })
            },
            spin: function(t, e) {
                this.node.stopAllActions();
                var i = cc.moveTo(e, cc.v2(this.node.x, -(this.node.height - 396))).easing(cc.easeInOut(3)),
                    n = cc.callFunc(function() { 0 === t && this.RedT.copy(), this.node.y = 0 }, this);
                if (4 === t) {
                    var o = cc.callFunc(function() { this.RedT.EF_vuathang(), this.node.y = 0, this.RedT.random(), this.RedT.hieuUng() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(.1 * t), i, o))
                } else this.node.runAction(cc.sequence(cc.delayTime(.1 * t), i, n))
            },
            stop: function() { this.node.stopAllActions(), this.RedT.copy(), this.node.y = 0 }
        }), cc._RF.pop()
    }, {}],
    Zeus_top: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "16e083VlxRHlYpusln5jRrS", "Zeus_top");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { item: cc.Prefab, content: cc.Node, red: !0 },
            onEnable: function() { this.get_data() },
            get_data: function(t) { void 0 === t && (t = 1), cc.RedT.send({ g: { zeus: { top: this.red } } }) },
            onData: function(t) {
                this.content.removeAllChildren();
                var e = this;
                Promise.all(t.map(function(t, i) {
                    var o = cc.instantiate(e.item),
                        c = o.getComponent("VQRed_history_item");
                    c.time.string = n.getStringDateByTime(t.time), c.phien.string = t.name, c.cuoc.string = n.numberWithCommas(t.bet), c.line.string = n.numberWithCommas(t.win), c.win.string = 2 == t.type ? "N\u1ed5 H\u0169" : "Th\u1eafng l\u1edbn", o.children[0].active = !(1 & i), e.content.addChild(o)
                }))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    Zeus: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9e5a3gmlfZAEZBJ1mCqGYsC", "Zeus");
        var n = t("Helper"),
            o = t("Zeus_reel"),
            c = t("Zeus_lines"),
            s = t("Zeus_playBonus"),
            a = t("Notice"),
            h = t("Zeus_dialog");
        cc.Class({
            extends: cc.Component,
            properties: { gameBonus: s, audioBG: cc.AudioSource, audioClickSpin: { default: null, type: cc.AudioClip }, audioClick: { default: null, type: cc.AudioClip }, audioWin: { default: null, type: cc.AudioClip }, audioBigWin: { default: null, type: cc.AudioClip }, audioJackpot: { default: null, type: cc.AudioClip }, redhat: cc.Node, reels: { default: [], type: o }, icon: cc.Prefab, icons: { default: [], type: cc.SpriteFrame }, betString: { default: [], type: cc.String }, audioIcons: { default: [], type: cc.SpriteFrame }, audioIcon: cc.Sprite, nodeNotice: cc.Node, prefabNotice: cc.Prefab, MiniPanel: cc.Prefab, loading: cc.Node, notice: a, dialog: h, Line: c, hu: cc.Label, taikhoan: cc.Label, tong: cc.Label, vuathang: cc.Label, labelLine: cc.Label, bet: cc.Label, freeLabel: cc.Label, phien: cc.Label, BigWin: cc.Animation, BigWin_Label: cc.Label, NoHu_close: cc.Node, NoHu: cc.Animation, NoHu_Label: cc.Label, EF_Bonus: cc.Animation, EF_Free: cc.Animation, buttonLine: cc.Node, buttonSpin: cc.Node, buttonSpinSpeed: cc.Node, buttonBet: cc.Node, buttonAuto: cc.Node, Game: cc.Node, ChonCuoc: cc.Node, hu100: cc.Label, hu1000: cc.Label, hu10000: cc.Label, isSpeed: !1, isForceSpeed: !1, isAuto: !1, isSpin: !1, isFreeSpin: !1, red: !0, betSelect: 0 },
            onLoad: function() {
                cc.RedT.inGame = this, cc.RedT.MiniPanel.node.parent = this.redhat;
                var t = this;
                this.Line.init(this), this.BigWin.on("finished", this.BigWinFinish, this), this.BigWin.on("play", this.BigWinPlay, this), this.EF_Free.on("finished", this.EF_FreeFinish, this), this.NoHu.on("play", this.NoHuPlay, this), this.EF_Bonus.on("finished", this.EF_BonusFinish, this), this.gameBonus.init(this), this.dialog.init(), Promise.all(this.reels.map(function(e) { e.init(t) })), this.Game.active = !1, this.ChonCuoc.active = !0, this.onGetAllHu(), cc.RedT.send({ scene: "zeus" }), this.taikhoan.string = n.numberWithCommas(cc.RedT.user.red), this.speed = 400, this.resetSpin(), cc.RedT.isSoundBackground() ? (this.playMusic(), this.audioIcon.spriteFrame = this.audioIcons[1]) : this.audioIcon.spriteFrame = this.audioIcons[0]
            },
            _playSFX: function(t) { cc.RedT.IS_SOUND && cc.audioEngine.playEffect(t, !1) },
            playClick: function() { this._playSFX(this.audioClick) },
            BigWinPlay: function() {
                var t = cc.callFunc(function() { this._playSFX(this.audioBigWin), n.numberTo(this.BigWin_Label, 0, this.H_win, 2e3, !0) }, this);
                this.BigWin.node.runAction(cc.sequence(cc.delayTime(.3), t))
            },
            BigWinFinish: function() { this.isBigWin = !1, this.BigWin.node.active = !1, this.BigWin_Label.string = "", this.showLineWin(!1), this.hieuUng() },
            NoHuPlay: function() {
                this.NoHu_Label.string = "";
                var t = cc.callFunc(function() { this._playSFX(this.audioJackpot), n.numberTo(this.NoHu_Label, 0, this.H_win, 2e3, !0) }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(.3), t));
                var e = cc.callFunc(function() { this.NoHu_close.active = !0 }, this);
                this.NoHu.node.runAction(cc.sequence(cc.delayTime(4), e))
            },
            NoHuFinish: function() { this.isNoHu = !1, this.isAuto && this.onAuto(), this.showLineWin(!1), this.hieuUng() },
            NoHuClose: function() { this.NoHu.node.active = this.NoHu_close.active = !1, this.NoHuFinish() },
            EF_BonusFinish: function() { this.EF_Bonus.node.active = !1, this.gameBonus.onPlay(this.isBonus), this.isBonus = 0, this.showLineWin(!1) },
            EF_FreeFinish: function() { this.isFree = !1, this.EF_Free.node.active = !1, this.showLineWin(!1), this.hieuUng() },
            onData: function(t) { void 0 !== t.user && (this.userData(t.user), cc.RedT.userData(t.user)), void 0 !== t.Zeus && this.Zeus(t.Zeus), void 0 !== t.mini && cc.RedT.MiniPanel.onData(t.mini), void 0 !== t.TopHu && (cc.RedT.setting.topHu.data = t.TopHu, this.onGetHu()), void 0 !== t.taixiu && cc.RedT.MiniPanel.TaiXiu.TX_Main.onData(t.taixiu), void 0 !== t.vipp && cc.RedT.MiniPanel.Dialog.VipPoint.onData(t.vipp) },
            userData: function(t) { this.red && (this.taikhoan.string = n.numberWithCommas(t.red)) },
            Zeus: function(t) {
                var e = this;
                void 0 !== t.status && (1 === t.status ? (Promise.all(t.cel.map(function(t, i) { Promise.all(t.map(function(t, n) { e.reels[i].icons[n].setIcon(t, !0) })) })), this.runReels(this.isSpeed), this.H_line_win = t.line_win, this.H_win = t.win, this.H_free = t.free, this.isBonus = t.isBonus, this.isNoHu = t.isNoHu, this.isBigWin = t.isBigWin, this.isFree = t.isFree, this.isFreeSpin = !!t.free) : this.resetSpin()), t.phien && (this.phien.string = "#" + t.phien), t.bonus && this.gameBonus.onData(t.bonus), t.log && this.dialog.history.onData(t.log), t.top && this.dialog.top.onData(t.top), t.notice && this.addNotice(t.notice)
            },
            EF_vuathang: function() { this.showLineWin(!0), this.vuathang.string = n.numberWithCommas(this.H_win), this.buttonSpin.active = !this.H_free, this.buttonSpinSpeed.active = !this.H_free, this.freeLabel.string = "Free: " + this.H_free, this.freeLabel.node.active = !!this.H_free },
            onLineWin: function(t) {
                var e = this;
                Promise.all(this.H_line_win.map(function(i) {
                    var n = e.Line.mainLines[i.line - 1];
                    t ? (n.ef = !0, n.onShow()) : (n.ef = !1, n.onHidden())
                }))
            },
            showLineWin: function(t) { this.onLineWin(t), t || this.isNoHu || this.isBigWin || this.isAuto || this.isFreeSpin || (this.eflineN = 0, this.efLineWin()) },
            efLineWin: function(t) {
                if (this.H_line_win.length) {
                    this.node.stopAllActions();
                    void 0 === this.H_line_win[this.eflineN] && (this.eflineN = 0), this.efOneLineWin(this.eflineN, !0);
                    var e = cc.callFunc(function() { this.efOneLineWin(this.eflineN, !1), this.eflineN += 1, this.efLineWin() }, this);
                    this.node.runAction(cc.sequence(cc.delayTime(1.5), e))
                }
            },
            efOneLineWin: function(t, e) {
                t = this.H_line_win[this.eflineN].line;
                var i = this.Line.mainLines[t - 1];
                e ? (i.ef = !0, i.onShow()) : (i.ef = !1, i.onHidden())
            },
            hieuUng: function() {
                if (this.isBigWin && !this.isNoHu) this.BigWin.node.active = !0, this.BigWin.play(), this.oldBigWin = !0;
                else if (this.isNoHu) this.NoHu.node.active = !0, this.NoHu.play();
                else if (this.isBonus) this.EF_Bonus.node.active = !0, this.EF_Bonus.play(), cc.RedT.audio.playEf("bonus");
                else if (this.isFree) this.EF_Free.node.active = !0, this.EF_Free.play();
                else if (this.H_win > 0) {
                    var t = new cc.Node;
                    t.addComponent(cc.Label), (t = t.getComponent(cc.Label)).string = "+" + n.numberWithCommas(this.H_win), t.font = cc.RedT.util.fontCong, t.lineHeight = 130, t.fontSize = 25, t.node.position = cc.v2(0, 21), this.nodeNotice.addChild(t.node), !this.oldBigWin && this._playSFX(this.audioWin), t.node.runAction(cc.sequence(cc.moveTo(1.2, cc.v2(0, 105)), cc.callFunc(function() { this.speed = 0, t.node.destroy(), this.hieuUng(), this.showLineWin(!1) }, this))), this.H_win = 0, this.oldBigWin = !1
                } else this.isAuto || this.isFreeSpin ? this.timeOut = setTimeout(function() { this.onAutoSpin(), this.speed = 400 }.bind(this), this.speed) : this.resetSpin()
            },
            onChangerBet: function(t, e) { this._playSFX(this.audioClick), this.betSelect++, this.betSelect > 2 && (this.betSelect = 0), this.bet.string = e, this.tong.string = n.numberWithCommas(this.Line.data.length * n.getOnlyNumberInString(this.bet.string)), this.Game.active = !0, this.ChonCuoc.active = !1, this.resetSpin(), this.onGetHu() },
            onSelectBet: function() { this.Game.active = !1, this.ChonCuoc.active = !0, this.onGetAllHu(), this.onGetHu() },
            changerCoint: function() { this.red = !this.red, this.nodeRed.active = !this.nodeRed.active, this.nodeXu.active = !this.nodeXu.active, this.userData(cc.RedT.user), this.onGetHu() },
            onClickAuto: function() { this._playSFX(this.audioClick), this.onAuto() },
            onAuto: function() { this.isAuto = !this.isAuto, this.isAuto ? this.buttonAuto.color = cc.Color.WHITE : this.buttonAuto.color = this.buttonAuto.color.fromHEX("#8A8A8A") },
            onClickSpin: function() { this.isSpeed = !1, this.onSpin() },
            onClickSpinSpeed: function() { this.isSpeed = !0, this.isAuto && (this.isForceSpeed = !0), this.onSpin() },
            onAutoSpin: function() { this._playSFX(this.audioClickSpin), this.onGetSpin() },
            onSpin: function() { this.Line.data.length < 1 ? this.addNotice("Ch\u1ecdn \xedt nh\u1ea5t 1 d\xf2ng") : this.isSpin || (this._playSFX(this.audioClickSpin), this.node.stopAllActions(), void 0 !== this.eflineN && void 0 !== this.H_line_win && this.H_line_win.length && this.efOneLineWin(this.eflineN, !1), this.eflineO = this.eflineN = 0, this.isSpin = !0, this.setSpin(), this.onGetSpin()) },
            setSpin: function() { this.buttonLine.pauseSystemEvents(), this.buttonSpin.pauseSystemEvents(), this.buttonSpinSpeed.pauseSystemEvents(), this.buttonBet.pauseSystemEvents() },
            resetSpin: function() { this.isAuto && this.onAuto(), this.isSpin = !1, this.isForceSpeed = !1, this.buttonLine.resumeSystemEvents(), this.buttonSpin.resumeSystemEvents(), this.buttonSpinSpeed.resumeSystemEvents(), this.buttonBet.resumeSystemEvents() },
            runReels: function(t) {
                var e = this;
                Promise.all(this.reels.map(function(i, n) { t || e.isForceSpeed ? i.spin(n, .25) : i.spin(n, 1) })), this.isSpeed = !1
            },
            copy: function() { Promise.all(this.reels.map(function(t) { t.icons[t.icons.length - 1].setIcon(t.icons[2].data), t.icons[t.icons.length - 2].setIcon(t.icons[1].data), t.icons[t.icons.length - 3].setIcon(t.icons[0].data) })) },
            random: function() { Promise.all(this.reels.map(function(t) { Promise.all(t.icons.map(function(e, i) { i > 2 && i < t.icons.length - 3 && e.random() })) })) },
            onGetSpin: function() { cc.RedT.send({ g: { zeus: { spin: { cuoc: n.getOnlyNumberInString(this.bet.string), line: this.Line.data } } } }) },
            addNotice: function(t) {
                var e = cc.instantiate(this.prefabNotice);
                e.getComponent("mini_warning").text.string = t, this.nodeNotice.addChild(e)
            },
            backGame: function() { cc.RedT.MiniPanel.node.parent = null, this.loading.active = !0, void 0 !== this.timeOut && clearTimeout(this.timeOut), cc.director.loadScene("MainGame") },
            signOut: function() { cc.director.loadScene("MainGame", function() { cc.RedT.inGame.signOut() }) },
            onGetHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    var e = n.getOnlyNumberInString(this.bet.string);
                    Promise.all(cc.RedT.setting.topHu.data.zeus.filter(function(t) { return t.type == e })).then(function(e) {
                        var i = n.getOnlyNumberInString(t.hu.string),
                            o = e[0].bet;
                        i - o != 0 && n.numberTo(t.hu, i, o, 2e3, !0)
                    })
                }
            },
            onGetAllHu: function() {
                var t = this;
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    n.getOnlyNumberInString(this.bet.string);
                    Promise.all(cc.RedT.setting.topHu.data.zeus.filter(function(t) { return 1 == t.red })).then(function(e) {
                        var i = e.filter(function(t) { return 100 == t.type }),
                            o = e.filter(function(t) { return 1e3 == t.type }),
                            c = e.filter(function(t) { return 1e4 == t.type }),
                            s = n.getOnlyNumberInString(t.hu100.string),
                            a = n.getOnlyNumberInString(t.hu1000.string),
                            h = n.getOnlyNumberInString(t.hu10000.string);
                        s - i[0].bet != 0 && n.numberTo(t.hu100, n.getOnlyNumberInString(t.hu100.string), i[0].bet, 4900, !0), a - o[0].bet != 0 && n.numberTo(t.hu1000, n.getOnlyNumberInString(t.hu1000.string), o[0].bet, 4900, !0), h - c[0].bet != 0 && n.numberTo(t.hu10000, n.getOnlyNumberInString(t.hu10000.string), c[0].bet, 4900, !0)
                    })
                }
            },
            playMusic: function() { this.audioBG.play() },
            pauseMusic: function() { this.audioBG.pause() },
            onSetAudio: function() { cc.RedT.isSoundBackground() ? (cc.RedT.setSoundBackground(!1), this.pauseMusic(), cc.RedT.IS_SOUND = !1, cc.RedT.setSoundGame(!1), this.audioIcon.spriteFrame = this.audioIcons[0]) : (cc.RedT.setSoundBackground(!0), this.playMusic(), cc.RedT.IS_SOUND = !0, cc.RedT.setSoundGame(!0), this.audioIcon.spriteFrame = this.audioIcons[1]) }
        }), cc._RF.pop()
    }, { Helper: "Helper", Notice: "Notice", Zeus_dialog: "Zeus_dialog", Zeus_lines: "Zeus_lines", Zeus_playBonus: "Zeus_playBonus", Zeus_reel: "Zeus_reel" }],
    bankATM: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a0e83lLppVIYZ+XtjAPPshZ", "bankATM");
        t("BrowserUtil");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { labelATMBank: cc.Label, ATMID: cc.String, prefab: cc.Prefab, moreBank: cc.Node, contentATMBank: cc.Node, inputTien: cc.EditBox, editOTP: cc.EditBox, loadList: !1, typeOTP: "" },
            onEnable: function() {!1 === this.loadList && this.getList() },
            onDisable: function() {},
            getList: function() { cc.RedT.send({ shop: { bank: { atm: { list: !0 } } } }) },
            onData: function(t) { void 0 !== t.list && this.onListATM(t.list) },
            onListATM: function(t) {
                this.loadList = !0, this.i_arg = t.map(function(t, e) {
                    var i = cc.instantiate(this.prefab),
                        n = i.getComponent("NapRed_itemOne");
                    return n.init(this, "i_arg", "labelATMBank", "onListClick"), n.id = t.id, n.text.string = t.name, this.contentATMBank.addChild(i), n.data = t, n
                }.bind(this))
            },
            onListClick: function(t) { this.ATMID = t.id },
            toggleMoreBank: function() { this.moreBank.active = !this.moreBank.active },
            onChangerRed: function(t) { void 0 === t && (t = 0), t = n.numberWithCommas(n.getOnlyNumberInString(t)), this.inputTien.string = 0 == t ? "" : t },
            changerTypeOTP: function(t) { this.typeOTP = t.node.name },
            onClickOTP: function() { cc.RedT.send({ otp: { type: this.typeOTP } }) },
            onClickTiep: function() {
                var t = n.getOnlyNumberInString(this.inputTien.string) >> 0;
                t < 5e4 ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "N\u1ea1p t\u1ed1i thi\u1ec3u 50.000" }) : 0 === this.ATMID.length ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "Vui l\xf2ng ch\u1ecdn th\u1ebb ATM thu\u1ed9c Ng\xe2n H\xe0ng b\u1ea1n mu\u1ed1n n\u1ea1p." }) : this.editOTP.string.length < 4 ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "M\xe3 OTP kh\xf4ng h\u1ee3p l\u1ec7." }) : (cc.RedT.inGame.bgLoading.onData({ active: !0, text: "\u0110ang g\u1eedi y\xeau c\u1ea7u..." }), cc.RedT.send({ shop: { bank: { atm: { select: { id: this.ATMID, name: this.labelATMBank.string, amount: t, otp: this.editOTP.string } } } } }))
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    bankNap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "72fdbys1l5HW7J4wCB8Lxax", "bankNap");
        var n = t("BrowserUtil"),
            o = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { labelBankName: cc.Label, labelBank: cc.Label, labelNumber: cc.Label, labelName: cc.Label, labelBranch: cc.Label, labelNoiDung: cc.Label, moreBank: cc.Node, scrollviewBank: { default: null, type: cc.ScrollView }, prefab: cc.Prefab, isLoad: !1, inputTien: cc.EditBox, hinhThuc: "" },
            onLoad: function() {
                this.isLoad || cc.RedT.send({ shop: { bank: { list: !0 } } });
                var t = this;
                this.editboxs = [this.inputTien], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.isTop() && t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onNapClick(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent() },
            onDisable: function() { this.moreBank.active = !1, cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onNapClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() {},
            toggleMoreBank: function() { this.moreBank.active = !this.moreBank.active },
            onData: function(t) {
                this.isLoad = !0, t.length > 0 && (this.i_arg = t.map(function(t, e) {
                    var i = cc.instantiate(this.prefab),
                        n = i.getComponent("NapRed_itemOne");
                    return n.init(this, "i_arg", "labelBank"), n.text.string = t.bank, this.scrollviewBank.content.addChild(i), n.data = t, n
                }.bind(this)))
            },
            backT: function(t) { this.labelBankName.string = t.bank, this.labelNumber.string = t.number, this.labelName.string = t.name, this.labelNoiDung.string = cc.RedT.user.name, this.toggleMoreBank() },
            setInfo: function(t) { this.labelBankName.string = t.bankname, this.labelNumber.string = t.number, this.labelName.string = t.name, this.labelNoiDung.string = t.noidung },
            onChangerRed: function(t) { void 0 === t && (t = 0), t = o.numberWithCommas(o.getOnlyNumberInString(t)), this.inputTien.string = 0 == t ? "" : t },
            onClickNap: function() {
                if (this.labelNumber.string.length)
                    if (o.getOnlyNumberInString(this.inputTien.string) >> 0 < 5e4) cc.RedT.inGame.notice.show({ title: "N\u1ea0P GO", text: "N\u1ea1p t\u1ed1i thi\u1ec3u 50.000" });
                    else {
                        var t = { hinhthuc: "bank" === this.labelBranch.string.toLowerCase() ? 1 : 0, bank: this.labelBankName.string, money: o.getOnlyNumberInString(this.inputTien.string), name: this.labelName.string, number: this.labelNumber.string };
                        t = { shop: { bank: { nap: t } } }, cc.RedT.send(t)
                    }
                else cc.RedT.inGame.notice.show({ title: "N\u1ea0P GO", text: "Vui l\xf2ng ch\u1ecdn ng\xe2n h\xe0ng mu\u1ed1n n\u1ea1p." })
            },
            onCopyNumber: function() { cc.RedT.CopyToClipboard(this.labelNumber.string), cc.RedT.inGame.noticeCopy() },
            onCopyName: function() { cc.RedT.CopyToClipboard(this.labelName.string), cc.RedT.inGame.noticeCopy() },
            onCopyBranch: function() { cc.RedT.CopyToClipboard(this.labelBranch.string), cc.RedT.inGame.noticeCopy() },
            onCopyNoiDung: function() { cc.RedT.CopyToClipboard(this.labelNickname.string), cc.RedT.inGame.noticeCopy() }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    bankRut: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e6e82lXaWpFFKSeuqaCN4Qt", "bankRut");
        var n = t("BrowserUtil"),
            o = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { editBank: cc.EditBox, editNumber: cc.EditBox, editName: cc.EditBox, editRut: cc.EditBox, editOTP: cc.EditBox, typeOTP: "" },
            init: function() {
                var t = this;
                this.editboxs = [this.editBank, this.editNumber, this.editName, this.editRut, this.editOTP], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.isTop() && t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onNapClick(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onNapClick()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.editBank.string = this.editNumber.string = this.editName.string = this.editRut.string = this.editOTP.string = "" },
            onClickOTP: function() { cc.RedT.send({ otp: { type: this.typeOTP } }) },
            changerTypeOTP: function(t) { this.typeOTP = t.node.name },
            onChangerRed: function(t) { void 0 === t && (t = 0), t = o.numberWithCommas(o.getOnlyNumberInString(t)), this.editRut.string = 0 == t ? "" : t },
            onClick: function() {
                var t = null;
                o.isEmpty(this.editBank.string) || o.isEmpty(this.editNumber.string) || o.isEmpty(this.editName.string) || o.isEmpty(this.editRut.string) || o.isEmpty(this.editOTP.string) ? t = "Ki\u1ec3m tra l\u1ea1i c\xe1c th\xf4ng tin..." : o.getOnlyNumberInString(this.editRut.string) < 1e4 && (t = "S\u1ed1 ti\u1ec1n R\xdaT t\u1ed1i thi\u1ec3u l\xe0 100.000."), t ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: t }) : cc.RedT.send({ shop: { bank: { rut: { bank: this.editBank.string, number: this.editNumber.string, name: this.editName.string, rut: o.getOnlyNumberInString(this.editRut.string), otp: this.editOTP.string } } } })
            }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    bgLoading: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b29c3M7ShVDkKHKf+49LVQZ", "bgLoading"), cc.Class({ extends: cc.Component, properties: { text: cc.Label }, onDisable: function() { this.text.string = "" }, onData: function(t) { void 0 !== t.active && (this.node.active = t.active), void 0 !== t.text && (this.text.string = t.text) } }), cc._RF.pop()
    }, {}],
    candy_reel_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b4e909CNdZP+6qJOWfTDfrb", "candy_reel_item"), cc.Class({ extends: cc.Component, properties: { icon: cc.Sprite, free: cc.Node, bonus: cc.Node, jacpot: cc.Node }, init: function(t) { this.RedT = t }, random: function() { var t = 11 * Math.random() >> 0; return this.setIcon(t), t }, setIcon: function(t, e) { void 0 === e && (e = !1), 10 == t ? (this.icon.node.active = !0, this.free.active = this.bonus.active = this.jacpot.active = !1, this.icon.spriteFrame = this.RedT.icons[7]) : 9 == t ? (this.free.active = !0, this.icon.node.active = this.bonus.active = this.jacpot.active = !1) : 8 == t ? (this.bonus.active = !0, this.icon.node.active = this.free.active = this.jacpot.active = !1) : 7 == t ? (this.jacpot.active = !0, this.icon.node.active = this.free.active = this.bonus.active = !1) : (this.free.active = this.bonus.active = this.jacpot.active = !1, this.icon.node.active = !0, this.icon.spriteFrame = this.RedT.icons[t]), e && (this.data = t) } }), cc._RF.pop()
    }, {}],
    dialogHuongDan: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "495d5jwe0pGBIw/joWKvc/9", "dialogHuongDan"), cc.Class({
            extends: cc.Component,
            properties: { game: cc.Node, content: cc.Node },
            init: function() { this.game = this.game.children.map(function(t) { return t.children[1].getComponent(cc.Label) }) },
            selectGame: function(t, e) { this.select(e) },
            select: function(t) {
                cc.RedT.audio.playClick();
                this.game.forEach(function(e) {
                    var i = e.node.parent;
                    i.name == t ? (i.children[0].active = !0, i.pauseSystemEvents()) : (i.children[0].active = !1, i.resumeSystemEvents())
                }), this.content.children.forEach(function(e) { e.name == t ? e.active = !0 : e.active = !1 })
            }
        }), cc._RF.pop()
    }, {}],
    dialog_VipPoint: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "91a2bDVASxNoIyKoAzh3ZQH", "dialog_VipPoint");
        var n = t("Helper").numberPad,
            o = t("Helper").numberWithCommas;
        cc.Class({
            extends: cc.Component,
            properties: { head: cc.Node, body: cc.Node, time_f: cc.Label, time_t: cc.Label, time_h: cc.Label, member: cc.Label, content: cc.Node, giai: cc.Node, item: cc.Prefab, isLoad: !1, distance: !1 },
            onEnable: function() {!this.isLoad && cc.RedT.send({ event: { vipp: !0 } }) },
            onData: function(t) { this.isLoad = !0, void 0 !== t.config && this.config(t.config), void 0 !== t.top && this.top(t.top) },
            top: function(t) {
                this.content.destroyAllChildren(), t.forEach(function(t, e) {
                    var i = cc.instantiate(this.item);
                    (i = i.getComponent("EVipPoint_item")).bg.active = e % 2, i.nick.string = t.name, 0 === e ? (i.icon1.active = !0, i.icon_oto.active = !0, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.top.node.active = !1, i.nick.node.color = i.nick.node.color.fromHEX("#FF06E1"), i.vip.node.color = i.nick.node.color, i.vip.string = "*******") : 1 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !0, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !0, i.icon3.active = !1, i.top.node.active = !1, i.nick.node.color = i.nick.node.color.fromHEX("#6BF300"), i.vip.node.color = i.nick.node.color, i.vip.string = "*******") : 2 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !0, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !0, i.top.node.active = !1, i.nick.node.color = i.nick.node.color.fromHEX("#FFA300"), i.vip.node.color = i.nick.node.color, i.vip.string = "*******") : 3 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !0, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = i.nick.node.color.fromHEX("#3399FF"), i.vip.node.color = i.nick.node.color, i.vip.string = t.vip) : 4 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.giai5.active = !0, i.icon_coin.active = !0, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = cc.Color.WHITE, i.vip.node.color = cc.Color.WHITE, i.vip.string = t.vip) : 5 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.giai6.active = !0, i.icon_coin.active = !0, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = cc.Color.WHITE, i.vip.node.color = cc.Color.WHITE, i.vip.string = t.vip) : 6 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.giai7.active = !0, i.icon_coin.active = !0, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = cc.Color.WHITE, i.vip.node.color = cc.Color.WHITE, i.vip.string = t.vip) : 7 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.giai8.active = !0, i.icon_coin.active = !0, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = cc.Color.WHITE, i.vip.node.color = cc.Color.WHITE, i.vip.string = t.vip) : 8 === e ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.giai9.active = !0, i.icon_coin.active = !0, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = cc.Color.WHITE, i.vip.node.color = cc.Color.WHITE, i.vip.string = t.vip) : e <= 19 ? (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.giai10_21.active = !0, i.icon_coin.active = !0, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = cc.Color.WHITE, i.vip.node.color = cc.Color.WHITE, i.vip.string = t.vip) : e <= 49 && (i.icon_oto.active = !1, i.icon_z800.active = !1, i.icon_sh.active = !1, i.icon_iphone.active = !1, i.icon1.active = !1, i.icon2.active = !1, i.icon3.active = !1, i.giai21_50.active = !0, i.icon_coin.active = !0, i.top.node.active = !0, i.top.string = e + 1, i.nick.node.color = cc.Color.WHITE, i.vip.node.color = cc.Color.WHITE, i.vip.string = t.vip), this.content.addChild(i.node)
                }.bind(this))
            },
            config: function(t) {
                if (0 === t.begin_d) this.time_f.string = "S\u1ef1 ki\u1ec7n ch\u01b0a di\u1ec5n ra", this.time_t.string = "S\u1ef1 ki\u1ec7n ch\u01b0a di\u1ec5n ra", this.time_h.string = "S\u1ef1 ki\u1ec7n ch\u01b0a di\u1ec5n ra";
                else {
                    this.member.string = t.member, this.time_f.string = n(t.begin_d, 2) + "/" + n(t.begin_m, 2);
                    new Date;
                    var e = new Date(t.begin_y, t.begin_m - 1, t.begin_d);
                    e.setDate(e.getDate() + t.day), this.time_t.string = n(e.getDate(), 2) + "/" + n(e.getMonth() + 1, 2), this.timeEnd = new Date(t.begin_y, t.begin_m - 1, t.begin_d), this.timeEnd.setDate(this.timeEnd.getDate() + t.day + 1), this.timeEnd = this.timeEnd.getTime();
                    var i = (new Date).getTime();
                    if (this.timeEnd - i < 0 ? (this.distance = !0, this.time_h.string = "S\u1ef1 ki\u1ec7n \u0111\xe3 k\u1ebft th\xfac") : t.status || (this.time_h.string = "S\u1ef1 ki\u1ec7n s\u1eafp di\u1ec5n ra!"), t.member > 0) this.giai.children[0].children[1].getComponent(cc.Label).string = o(t.top1);
                    if (t.member > 1) this.giai.children[1].children[1].getComponent(cc.Label).string = o(t.top2);
                    if (t.member > 2) this.giai.children[2].children[1].getComponent(cc.Label).string = o(t.top3);
                    if (t.member > 3) this.giai.children[3].children[1].getComponent(cc.Label).string = o(t.top4);
                    if (t.member > 4) this.giai.children[4].children[1].getComponent(cc.Label).string = o(t.top5);
                    if (t.member > 5)
                        if (this.giai.children[5].children[1].getComponent(cc.Label).string = o(t.top6_10), t.member < 11) this.giai.children[5].children[0].getComponent(cc.Label).string = "6-" + t.member, this.giai.children[6].active = !1, this.giai.children[7].active = !1, this.giai.children[8].active = !1;
                    if (t.member > 10)
                        if (this.giai.children[6].children[1].getComponent(cc.Label).string = o(t.top11_20), t.member < 21) this.giai.children[6].children[0].getComponent(cc.Label).string = "11-" + t.member, this.giai.children[7].active = !1, this.giai.children[8].active = !1;
                    if (t.member > 20)
                        if (this.giai.children[7].children[1].getComponent(cc.Label).string = o(t.top21_50), t.member < 51) this.giai.children[7].children[0].getComponent(cc.Label).string = "21-" + t.member, this.giai.children[8].active = !1;
                    if (t.member > 50) this.giai.children[8].children[1].getComponent(cc.Label).string = o(t.top51_xxx)
                }
            },
            onHeadSelect: function(t) {
                var e = t.target.name;
                this.head.children.forEach(function(t) { t.name === e ? (t.children[0].active = !1, t.children[1].active = !0) : (t.children[0].active = !0, t.children[1].active = !1) }), this.body.children.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 })
            },
            update: function(t) {
                if (!1 === this.distance) {
                    var e = (new Date).getTime(),
                        i = this.timeEnd - e;
                    if (i < 0) this.time_h.string = "S\u1ef1 ki\u1ec7n \u0111\xe3 k\u1ebft th\xfac";
                    else {
                        var o = Math.floor(i / 864e5),
                            c = Math.floor(i % 864e5 / 36e5),
                            s = Math.floor(i % 36e5 / 6e4),
                            a = Math.floor(i % 6e4 / 1e3),
                            h = "";
                        o > 0 && (h += o + " ng\xe0y\n"), h += n(c, 2) + ":" + n(s, 2) + ":" + n(a, 2), this.time_h.string = h
                    }
                }
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    fish_EFcoint: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0523fq9zpdKS5b1accvj8bj", "fish_EFcoint"), cc.Class({
            extends: cc.Component,
            properties: { coint: dragonBones.ArmatureDisplay },
            init: function(t, e, i) {
                this.coint.on(dragonBones.EventObject.LOOP_COMPLETE, this.COMPLETE, this), this.node.x = e.x + Math.floor(Math.random() * (2 * i.x + 1)) - i.x, this.node.y = e.y + Math.floor(Math.random() * (2 * i.y + 1)) - i.y, t.RedT.Game.nodeCoint.addChild(this.node), i = null;
                var n = t.iconCoint.node.parent.convertToWorldSpaceAR(t.iconCoint.node.position);
                this.position = this.node.parent.convertToNodeSpaceAR(n), this.changer = !1
            },
            COMPLETE: function() {
                if (!1 === this.changer) {
                    this.coint.playAnimation("rotation", 0);
                    var t = this.node.position.sub(this.position).mag();
                    t /= 800, this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(t, .4), cc.moveTo(t, this.position)), cc.callFunc(function() { this.node.destroy() }, this)))
                }
                this.changer = !0
            }
        }), cc._RF.pop()
    }, {}],
    fish_EFlabelMoney: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "97c8fPfWQNA06NAGRRSUoDf", "fish_EFlabelMoney"), cc.Class({ extends: cc.Component, onLoad: function() { this.node.runAction(cc.sequence(cc.scaleTo(.1, 1.5), cc.scaleTo(.1, 1), cc.delayTime(.7), cc.fadeTo(.1, 50), cc.callFunc(function() { this.node.destroy() }, this))) } }), cc._RF.pop()
    }, {}],
    fish_EF: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3a77aSDxt5CnLbD8ehMPfQo", "fish_EF"), cc.Class({ extends: cc.Component, properties: { anim: dragonBones.ArmatureDisplay, ef: cc.String }, onLoad: function() { this.onDie = function() { this.node.destroy() }, this.anim.on(dragonBones.EventObject.COMPLETE, this.onDie, this), this.anim.playAnimation(this.ef, 1) } }), cc._RF.pop()
    }, {}],
    full_responsive: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "8618cQMVlxIpJJWyUWs76o+", "full_responsive"), cc.Class({ extends: cc.Component, onEnable: function() { this.node.width = cc.RedT.inGame.node.width, this.node.height = cc.RedT.inGame.node.height } }), cc._RF.pop()
    }, {}],
    hoverScale: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d8e56/FW3FDTab9UduKTQcx", "hoverScale"), cc.Class({ extends: cc.Component, properties: { pressedScale: 1, transDuration: 0 }, onLoad: function() { this.initScale = this.node.scale, this.scaleOnAction = cc.scaleTo(this.transDuration, this.pressedScale), this.scaleOffAction = cc.scaleTo(this.transDuration, this.initScale) }, onEnable: function() { this.node.on(cc.Node.EventType.MOUSE_ENTER, this.eventOnHover, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.eventOffHover, this) }, onDisable: function() { this.node.off(cc.Node.EventType.MOUSE_ENTER, this.eventOnHover, this), this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.eventOffHover, this) }, eventOnHover: function(t) { this.node.stopAllActions(), this.node.runAction(this.scaleOnAction) }, eventOffHover: function(t) { this.node.stopAllActions(), this.node.runAction(this.scaleOffAction) } }), cc._RF.pop()
    }, {}],
    iMessage_item: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "08764g9eU1CrrI+WH3GeclU", "iMessage_item"), cc.Class({ extends: cc.Component, properties: { dot: cc.Node, bg: cc.Node, title: cc.Label, time: cc.Label }, init: function(t) { this.RedT = t }, onClick: function() { this.RedT.onContentClick(this) } }), cc._RF.pop()
    }, {}],
    iMessage: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "70701e+jWpDjIG4eqgLNgmQ", "iMessage");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { news: cc.Label, text: cc.Label, item: cc.Prefab, content: cc.Node, message: "" },
            onLoad: function() {},
            onEnable: function() { cc.RedT.send({ message: { update: !0 } }) },
            onData: function(t) { t.list && (this.list(t.list), this.countNews(t.list)), t.text && (this.text.string = t.text), t.news && (t.news > 0 ? (this.news.node.active = !0, this.news.string = t.news) : this.news.node.active = !1) },
            list: function(t) {
                this.content.destroyAllChildren();
                var e = this;
                Promise.all(t.map(function(t) {
                    var i = cc.instantiate(e.item);
                    (i = i.getComponent("iMessage_item")).init(e), i.title.string = t.title, i.time.string = n.getStringDateByTime(t.time), i.bg.active = !t.read, i.dot.active = e.message == t._id, i.message = t._id, e.content.addChild(i.node)
                }))
            },
            onContentClick: function(t) {
                var e = this;
                t.message != this.message && (t.bg.active = !1, cc.RedT.audio.playClick(), this.message = t.message, this.getContent(), t.dot.active = !0, Promise.all(this.content.children.filter(function(e) { return e != t.node && (e.children[0].active = !1), e.children[1].active })).then(function(t) {
                    (t = t.length) > 0 ? (e.news.node.active = !0, e.news.string = t) : e.news.node.active = !1
                }))
            },
            getContent: function(t) { cc.RedT.send({ message: { view: this.message } }) },
            reset: function() { this.content.destroyAllChildren(), this.text.string = this.news.string = "", this.news.node.active = !1 },
            countNews: function(t) {
                var e = t.filter(function(t) { return !t.read });
                (e = e.length) > 0 ? (this.news.node.active = !0, this.news.string = e) : this.news.node.active = !1
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    iconGameBai: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fbc3eTUdt9BmbNrv1zsHCzT", "iconGameBai"), cc.Class({ extends: cc.Component, properties: { title: "", game: "", table2: !0 }, openGame: function() { cc.RedT.IS_LOGIN ? cc.RedT.inGame.MenuRoom.openGame(this) : cc.RedT.inGame.dialog.showSignIn() } }), cc._RF.pop()
    }, {}],
    iconGameHu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b464brTuF9Jkai40xgtDiaq", "iconGameHu"), cc.Class({ extends: cc.Component, properties: { hu100: cc.Label, hu1k: cc.Label, hu10k: cc.Label } }), cc._RF.pop()
    }, {}],
    iconGameTaiXiu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f5d22VsrEZLuKko/Zky02F3", "iconGameTaiXiu"), cc.Class({ extends: cc.Component, properties: { tai: cc.Label, xiu: cc.Label } }), cc._RF.pop()
    }, {}],
    iconGame: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a98fahA/phPCZvYv2bUDP1B", "iconGame"), cc.Class({ extends: cc.Component, properties: { slot: !1, mini: !1, bai: !1, khac: !1 } }), cc._RF.pop()
    }, {}],
    inputNumber: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b256eN/SStPwZz/lPd3MUDm", "inputNumber");
        var n = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var t = this;
                this.editbox = this.node.getComponent(cc.EditBox), this.onShift = !1, this.eventKeyDown = function(e) { 16 === e.keyCode && (t.onShift = !0, e.preventDefault()), !t.onShift && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 37 && e.keyCode <= 40 || 107 === e.keyCode || 109 === e.keyCode || 189 === e.keyCode || 8 === e.keyCode || 13 === e.keyCode) || e.preventDefault() }, this.eventKeyUp = function(e) { 16 === e.keyCode && (e.preventDefault(), t.onShift = !1) }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEventTT() },
            onDisable: function() { cc.sys.isBrowser && this.removeEventTT() },
            addEventTT: function() { n.getHTMLElementByEditBox(this.editbox).addEventListener("keydown", this.eventKeyDown, !1), n.getHTMLElementByEditBox(this.editbox).addEventListener("keyup", this.eventKeyUp, !1) },
            removeEventTT: function() { n.getHTMLElementByEditBox(this.editbox).removeEventListener("keydown", this.eventKeyDown, !1), n.getHTMLElementByEditBox(this.editbox).removeEventListener("keyup", this.eventKeyUp, !1) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil" }],
    itemContentMenu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ef328suSpdNvq+JTw+borMJ", "itemContentMenu"), cc.Class({ extends: cc.Component, properties: { nodeUnSelect: cc.Node, nodeSelect: cc.Node, text: cc.Node }, select: function() { this.nodeUnSelect.active = !1, this.nodeSelect.active = !0, this.node.pauseSystemEvents() }, unselect: function() { this.nodeUnSelect.active = !0, this.nodeSelect.active = !1, this.node.resumeSystemEvents() } }), cc._RF.pop()
    }, {}],
    itemHeadMenu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b32dagCeD1MVp59ygCz6Tsa", "itemHeadMenu"), cc.Class({ extends: cc.Component, properties: { nodeUnSelect: cc.Node, nodeSelect: cc.Node }, select: function() { this.nodeUnSelect.active = !1, this.nodeSelect.active = !0, this.node.pauseSystemEvents() }, unselect: function() { this.nodeUnSelect.active = !0, this.nodeSelect.active = !1, this.node.resumeSystemEvents() } }), cc._RF.pop()
    }, {}],
    kq_xsmb: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "be9a6IySFBEu49sR6oBJMoM", "kq_xsmb");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { date_count: 0, date: cc.Label, datePre: cc.Label, dateNext: cc.Label, gdb: cc.Label, g1: cc.Label, g2: { default: [], type: cc.Label }, g3: { default: [], type: cc.Label }, g4: { default: [], type: cc.Label }, g5: { default: [], type: cc.Label }, g6: { default: [], type: cc.Label }, g7: { default: [], type: cc.Label }, tk0: cc.Label, tk1: cc.Label, tk2: cc.Label, tk3: cc.Label, tk4: cc.Label, tk5: cc.Label, tk6: cc.Label, tk7: cc.Label, tk8: cc.Label, tk9: cc.Label },
            onLoad: function() {
                var t = new Date;
                this.date.string = n.numberPad(t.getDate(), 2) + "/" + n.numberPad(t.getMonth() + 1, 2) + "/" + t.getFullYear(), this.get_data(), (t = new Date).setDate(t.getDate() + 1), this.dateNext.string = n.numberPad(t.getDate(), 2) + "/" + n.numberPad(t.getMonth() + 1, 2) + "/" + t.getFullYear(), (t = new Date).setDate(t.getDate() - 1), this.datePre.string = n.numberPad(t.getDate(), 2) + "/" + n.numberPad(t.getMonth() + 1, 2) + "/" + t.getFullYear()
            },
            get_data: function() { cc.RedT.send({ g: { xs: { mb: { kq: this.date.string } } } }) },
            onDatePre: function() { this.date_count--, this.onDateChanget() },
            onDateNext: function() { this.date_count++, this.onDateChanget() },
            onDateChanget: function() {
                this.reset();
                var t = new Date;
                t.setDate(t.getDate() + this.date_count), this.date.string = n.numberPad(t.getDate(), 2) + "/" + n.numberPad(t.getMonth() + 1, 2) + "/" + t.getFullYear(), this.get_data(), (t = new Date).setDate(t.getDate() + this.date_count + 1), this.dateNext.string = n.numberPad(t.getDate(), 2) + "/" + n.numberPad(t.getMonth() + 1, 2) + "/" + t.getFullYear(), (t = new Date).setDate(t.getDate() + this.date_count - 1), this.datePre.string = n.numberPad(t.getDate(), 2) + "/" + n.numberPad(t.getMonth() + 1, 2) + "/" + t.getFullYear()
            },
            reset: function() { this.gdb.string = "-----", this.g1.string = "-----", this.g2.forEach(function(t) { t.string = "-----" }), this.g3.forEach(function(t) { t.string = "-----" }), this.g4.forEach(function(t) { t.string = "----" }), this.g5.forEach(function(t) { t.string = "----" }), this.g6.forEach(function(t) { t.string = "---" }), this.g7.forEach(function(t) { t.string = "--" }), this.tk0.string = "-", this.tk1.string = "-", this.tk2.string = "-", this.tk3.string = "-", this.tk4.string = "-", this.tk5.string = "-", this.tk6.string = "-", this.tk7.string = "-", this.tk8.string = "-", this.tk9.string = "-" },
            onData: function(t) {
                t.gdb && (this.gdb.string = t.gdb), t.g1 && (this.g1.string = t.g1), this.g2.forEach(function(e, i) { t.g2[i] && (e.string = t.g2[i]) }), this.g3.forEach(function(e, i) { t.g3[i] && (e.string = t.g3[i]) }), this.g4.forEach(function(e, i) { t.g4[i] && (e.string = t.g4[i]) }), this.g5.forEach(function(e, i) { t.g5[i] && (e.string = t.g5[i]) }), this.g6.forEach(function(e, i) { t.g6[i] && (e.string = t.g6[i]) }), this.g7.forEach(function(e, i) { t.g7[i] && (e.string = t.g7[i]) });
                var e = [t.g1.substring(t.g1.length - 2), t.gdb.substring(t.gdb.length - 2)].concat(t.g2.map(function(t) { return t.substring(t.length - 2) }), t.g3.map(function(t) { return t.substring(t.length - 2) }), t.g4.map(function(t) { return t.substring(t.length - 2) }), t.g5.map(function(t) { return t.substring(t.length - 2) }), t.g6.map(function(t) { return t.substring(t.length - 2) }), t.g7.map(function(t) { return t.substring(t.length - 2) })),
                    i = e.filter(function(t) { return "0" === t.charAt() }),
                    n = e.filter(function(t) { return "1" === t.charAt() }),
                    o = e.filter(function(t) { return "2" === t.charAt() }),
                    c = e.filter(function(t) { return "3" === t.charAt() }),
                    s = e.filter(function(t) { return "4" === t.charAt() }),
                    a = e.filter(function(t) { return "5" === t.charAt() }),
                    h = e.filter(function(t) { return "6" === t.charAt() }),
                    r = e.filter(function(t) { return "7" === t.charAt() }),
                    d = e.filter(function(t) { return "8" === t.charAt() }),
                    u = e.filter(function(t) { return "9" === t.charAt() });
                i.length > 0 && (this.tk0.string = i.join(", ")), n.length > 0 && (this.tk1.string = n.join(", ")), o.length > 0 && (this.tk2.string = o.join(", ")), c.length > 0 && (this.tk3.string = c.join(", ")), s.length > 0 && (this.tk4.string = s.join(", ")), a.length > 0 && (this.tk5.string = a.join(", ")), h.length > 0 && (this.tk6.string = h.join(", ")), r.length > 0 && (this.tk7.string = r.join(", ")), d.length > 0 && (this.tk8.string = d.join(", ")), u.length > 0 && (this.tk9.string = u.join(", "))
            }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    miniBigWin: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1b515XdufZBFaOcG7quJClg", "miniBigWin");
        var n = t("Helper").numberTo;
        cc.Class({ extends: cc.Component, properties: { bet: cc.Label }, onLoad: function() { this.bet.font = cc.RedT.util.fontCong, this.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() { cc.RedT.audio.playEf("moneywin"), n(this.bet, 0, this.node.bet, 1e3, !0) }, this))) } }), cc._RF.pop()
    }, { Helper: "Helper" }],
    mini_warning: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c832drPwXtFyrxiOXSF7olJ", "mini_warning"), cc.Class({ extends: cc.Component, properties: { text: { default: null, type: cc.Label } }, onEnable: function() { this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.09, 1), cc.fadeTo(.09, 255)), cc.delayTime(2.5), cc.spawn(cc.scaleTo(.09, 1.5), cc.fadeTo(.09, 0)), cc.callFunc(function() { this.node.destroyAllChildren(), this.node.destroy() }, this))) } }), cc._RF.pop()
    }, {}],
    popupEvent: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "63c1ej4tzdI66hlcNzoZsv6", "popupEvent"), cc.Class({
            extends: cc.Component,
            onLoad: function() { cc.RedT.setting.popupEvent = cc.RedT.setting.popupEvent || {}, this.ttOffset = null, this.ttOffset2 = null, void 0 !== cc.RedT.setting.popupEvent.position && (this.node.position = cc.RedT.setting.popupEvent.position) },
            onEnable: function() { this.node.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.node.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.node.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.node.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y), this.ttOffset2 = cc.v2(t.touch.getLocationX() - (t.touch.getLocationX() - this.node.position.x), t.touch.getLocationY() - (t.touch.getLocationY() - this.node.position.y)) },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.ttOffset.x,
                    i = t.touch.getLocationY() - this.ttOffset.y;
                Math.abs(e) > cc.RedT.inGame.node.width / 2 - 100 && (e = e < 0 ? -cc.RedT.inGame.node.width / 2 + 100 : cc.RedT.inGame.node.width / 2 - 100), Math.abs(i) > cc.RedT.inGame.node.height / 2 - 50 && (i = i < 0 ? -cc.RedT.inGame.node.height / 2 + 50 : cc.RedT.inGame.node.height / 2 - 50), this.node.position = cc.v2(e, i)
            },
            eventEnd: function(t) { cc.RedT.setting.popupEvent.position = this.node.position, this.xChanger = this.ttOffset2.x - (t.touch.getLocationX() - this.ttOffset.x), this.yChanger = this.ttOffset2.y - (t.touch.getLocationY() - this.ttOffset.y), this.xChanger < 5 && this.xChanger > -5 && this.yChanger < 5 && this.yChanger > -5 && this.show() },
            setTop: function() { this.node.parent.insertChild(this.node) },
            show: function() { cc.RedT.IS_LOGIN ? cc.RedT.MiniPanel.Dialog.showVipPoint() : cc.RedT.inGame.dialog.showSignIn() }
        }), cc._RF.pop()
    }, {}],
    popupMinigame: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "acd26OFlQpFU6xTJ63KhBKq", "popupMinigame"), cc.Class({
            extends: cc.Component,
            properties: { list: { default: null, type: cc.Node }, time: { default: null, type: cc.Label }, nodeTime: { default: null, type: cc.Node }, panel: { default: null, type: cc.Node } },
            onLoad: function() { cc.RedT.setting.popupMini = cc.RedT.setting.popupMini || {}, this.ttOffset = null, this.ttOffset2 = null, this.toggleRuning = !1, void 0 !== cc.RedT.setting.popupMini.position && (this.node.position = cc.RedT.setting.popupMini.position), void 0 !== cc.RedT.setting.popupMini.open && (cc.RedT.setting.popupMini.open ? (this.list.active = !0, this.nodeTime.position = cc.v2(-155.7, 43), this.list.scale = 1) : (this.nodeTime.position = cc.v2(25, 43), this.list.scale = .2, this.list.active = !1)) },
            onEnable: function() { this.panel.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.panel.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.panel.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.panel.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.panel.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.panel.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.panel.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.panel.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.panel.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.panel.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y), this.ttOffset2 = cc.v2(t.touch.getLocationX() - (t.touch.getLocationX() - this.node.position.x), t.touch.getLocationY() - (t.touch.getLocationY() - this.node.position.y)) },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.ttOffset.x,
                    i = t.touch.getLocationY() - this.ttOffset.y;
                Math.abs(e) > cc.RedT.inGame.node.width / 2 - 50 && (e = e < 0 ? -cc.RedT.inGame.node.width / 2 + 50 : cc.RedT.inGame.node.width / 2 - 50), Math.abs(i) > cc.RedT.inGame.node.height / 2 - 50 && (i = i < 0 ? -cc.RedT.inGame.node.height / 2 + 50 : cc.RedT.inGame.node.height / 2 - 50), this.node.position = cc.v2(e, i)
            },
            eventEnd: function(t) { cc.RedT.setting.popupMini.position = this.node.position, this.xChanger = this.ttOffset2.x - (t.touch.getLocationX() - this.ttOffset.x), this.yChanger = this.ttOffset2.y - (t.touch.getLocationY() - this.ttOffset.y), this.xChanger < 5 && this.xChanger > -5 && this.yChanger < 5 && this.yChanger > -5 && this.toggle() },
            toggle: function() { cc.RedT.audio.playClick(), this.toggleRuning || (this.toggleRuning = !0, this.list.stopAllActions(), this.list.active ? (cc.RedT.setting.popupMini.open = !1, this.nodeTime.active ? this.nodeTime.runAction(cc.moveTo(.3, cc.v2(25, 43))) : this.nodeTime.position = cc.v2(25, 43), this.list.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, .2).easing(cc.easeBackIn(3)), cc.rotateTo(.3, -720)), cc.callFunc(function() { this.toggleRuning = this.list.active = !1 }, this)))) : (this.list.active = cc.RedT.setting.popupMini.open = !0, this.nodeTime.active ? this.nodeTime.runAction(cc.moveTo(.3, cc.v2(-155.7, 43))) : this.nodeTime.position = cc.v2(-155.7, 43), this.list.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 1).easing(cc.easeBackOut(3)), cc.rotateTo(.3, 720)), cc.callFunc(function() { this.toggleRuning = !1 }, this))))) },
            setTop: function() { this.node.parent.insertChild(this.node) }
        }), cc._RF.pop()
    }, {}],
    popupTopHu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "60851P7puJFtJI47yoz+HGT", "popupTopHu");
        var n = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { content: { default: null, type: cc.Node }, body: { default: null, type: cc.Node }, header: { default: null, type: cc.Node }, panel: { default: null, type: cc.Node }, x: { default: [], type: cc.SpriteFrame }, bet: "" },
            init: function(t) { this.RedT = t },
            onLoad: function() { this.ttOffset = null, this.ttOffset2 = null, this.toggleRuning = !1, this.content.children.forEach(function(t) { t.hu = t.children[5].getComponent(cc.Label), t.sukien = t.children[2], t.xHu = t.children[0].getComponent(cc.Sprite) }), this.header = this.header.children.map(function(t) { return t }), cc.RedT.setting.topHu = cc.RedT.setting.topHu || {}, void 0 !== cc.RedT.setting.topHu.position && (this.node.position = cc.RedT.setting.topHu.position), void 0 !== cc.RedT.setting.topHu.open && (this.body.active = cc.RedT.setting.topHu.open), void 0 !== cc.RedT.setting.topHu.data && this.onData(cc.RedT.setting.topHu.data) },
            onEnable: function() {},
            onDisable: function() {},
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y), this.ttOffset2 = cc.v2(t.touch.getLocationX() - (t.touch.getLocationX() - this.node.position.x), t.touch.getLocationY() - (t.touch.getLocationY() - this.node.position.y)) },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.ttOffset.x,
                    i = t.touch.getLocationY() - this.ttOffset.y;
                Math.abs(e) > cc.RedT.inGame.node.width / 2 - 50 && (e = e < 0 ? -cc.RedT.inGame.node.width / 2 + 50 : cc.RedT.inGame.node.width / 2 - 50), Math.abs(i) > cc.RedT.inGame.node.height / 2 - 50 && (i = i < 0 ? -cc.RedT.inGame.node.height / 2 + 50 : cc.RedT.inGame.node.height / 2 - 50), this.node.position = cc.v2(e, i)
            },
            eventEnd: function(t) { cc.RedT.setting.topHu.position = this.node.position, this.xChanger = this.ttOffset2.x - (t.touch.getLocationX() - this.ttOffset.x), this.yChanger = this.ttOffset2.y - (t.touch.getLocationY() - this.ttOffset.y), this.xChanger < 5 && this.xChanger > -5 && this.yChanger < 5 && this.yChanger > -5 && this.toggle() },
            toggle: function() { cc.RedT.audio.playClick(), this.body.active = cc.RedT.setting.topHu.open = !this.body.active, this.onChangerData() },
            onChangerBet: function(t, e) { this.bet = e, this.header.forEach(function(e) { t.target !== e ? e.children[1].active = !1 : e.children[1].active = !0 }), this.onChangerData() },
            onData: function(t) { cc.RedT.setting.topHu.data = t, this.body.active && this.onChangerData(), this.onChangerGame() },
            onChangerData: function() {
                if (void 0 !== cc.RedT.setting.topHu.data) {
                    var t = [],
                        e = this.content.children.map(function(e) {
                            var i = e.name,
                                n = cc.RedT.setting.topHu.data[i].filter(function(t) { return t.type == this.bet }.bind(this));
                            return t[i] = e, n.length ? n[0].name = i : n[0] = { name: i, bet: 0 }, n[0]
                        }.bind(this));
                    (e = e.sort(function(t, e) { return e.bet - t.bet })).forEach(function(e, i) {
                        var o = t[e.name];
                        o.stopAllActions();
                        var c = -(75 * (i + 1) - 37.5);
                        o.runAction(cc.moveTo(.2, cc.v2(0, c))), n.getOnlyNumberInString(o.hu.string) - e.bet != 0 && n.numberTo(o.hu, n.getOnlyNumberInString(o.hu.string), e.bet, 2e3, !0), e.balans > 0 && this.x[e.x - 2] ? (o.xHu.node.active = !0, o.sukien.active = !0, o.xHu.spriteFrame = this.x[e.x - 2]) : (o.xHu.node.active = !1, o.sukien.active = !1)
                    }.bind(this))
                }
            },
            onChangerGame: function() { this.RedT.MiniPoker.onGetHu(), this.RedT.BaCay.onGetHu(), this.RedT.BigBabol.onGetHu(), this.RedT.CaoThap.onGetHu(), this.RedT.AngryBirds.onGetHu(), void 0 !== cc.RedT.inGame.onGetHu && cc.RedT.inGame.onGetHu() },
            setTop: function() { this.node.parent.insertChild(this.node) }
        }), cc._RF.pop()
    }, { Helper: "Helper" }],
    popupx2Nap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "565dbtPf8VHEqwa5jcCF8x6", "popupx2Nap"), cc.Class({
            extends: cc.Component,
            onLoad: function() { cc.RedT.setting.popupEvent = cc.RedT.setting.popupEvent || {}, this.ttOffset = null, this.ttOffset2 = null, void 0 !== cc.RedT.setting.popupEvent.position && (this.node.position = cc.RedT.setting.popupEvent.position) },
            onEnable: function() { this.node.on(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.on(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.node.on(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            onDisable: function() { this.node.off(cc.Node.EventType.TOUCH_START, this.eventStart, this), this.node.off(cc.Node.EventType.TOUCH_MOVE, this.eventMove, this), this.node.off(cc.Node.EventType.TOUCH_END, this.eventEnd, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.eventEnd, this), this.node.off(cc.Node.EventType.MOUSE_ENTER, this.setTop, this) },
            eventStart: function(t) { this.setTop(), this.ttOffset = cc.v2(t.touch.getLocationX() - this.node.position.x, t.touch.getLocationY() - this.node.position.y), this.ttOffset2 = cc.v2(t.touch.getLocationX() - (t.touch.getLocationX() - this.node.position.x), t.touch.getLocationY() - (t.touch.getLocationY() - this.node.position.y)) },
            eventMove: function(t) {
                var e = t.touch.getLocationX() - this.ttOffset.x,
                    i = t.touch.getLocationY() - this.ttOffset.y;
                Math.abs(e) > cc.RedT.inGame.node.width / 2 - 100 && (e = e < 0 ? -cc.RedT.inGame.node.width / 2 + 100 : cc.RedT.inGame.node.width / 2 - 100), Math.abs(i) > cc.RedT.inGame.node.height / 2 - 50 && (i = i < 0 ? -cc.RedT.inGame.node.height / 2 + 50 : cc.RedT.inGame.node.height / 2 - 50), this.node.position = cc.v2(e, i)
            },
            eventEnd: function(t) { cc.RedT.setting.popupEvent.position = this.node.position, this.xChanger = this.ttOffset2.x - (t.touch.getLocationX() - this.ttOffset.x), this.yChanger = this.ttOffset2.y - (t.touch.getLocationY() - this.ttOffset.y), this.xChanger < 5 && this.xChanger > -5 && this.yChanger < 5 && this.yChanger > -5 && this.show() },
            setTop: function() { this.node.parent.insertChild(this.node) },
            show: function() { cc.RedT.IS_LOGIN ? cc.RedT.inGame.dialog.showx2Nap() : cc.RedT.inGame.dialog.showSignIn() }
        }), cc._RF.pop()
    }, {}],
    shopMuaTheCao: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "36ec7BUYDJJTorK1lfR1/DA", "shopMuaTheCao");
        var n = t("BrowserUtil"),
            o = t("Helper");
        cc.Class({
            extends: cc.Component,
            properties: { NhanhMang: { default: null, type: cc.Label }, MenhGia: { default: null, type: cc.Label }, editSoLuong: { default: null, type: cc.EditBox }, editOTP: { default: null, type: cc.EditBox }, moreNhaMang: { default: null, type: cc.Node }, moreMenhGia: { default: null, type: cc.Node }, scrollviewNhaMang: { default: null, type: cc.ScrollView }, scrollviewMenhGia: { default: null, type: cc.ScrollView }, bangGia: { default: null, type: cc.ScrollView }, prefabLeft: { default: null, type: cc.Prefab }, prefabRight: { default: null, type: cc.Prefab } },
            init: function() {
                var t = this;
                this.isLoaded = !1, this.editboxs = [this.editSoLuong, this.editOTP], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.isTop() && t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (n.focusGame(), t.onClickMua(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent(), this.isLoaded || cc.RedT.send({ shop: { info_mua: !0 } }) },
            onDisable: function() { this.moreNhaMang.active = this.moreMenhGia.active = !1, cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onClickMua()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (n.checkEditBoxFocus(this.editboxs[e])) { n.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !(this.moreNhaMang.active || this.moreMenhGia.active || cc.RedT.inGame.notice.node.active || cc.RedT.inGame.loading.active) },
            clean: function() { this.editSoLuong.string = "" },
            toggleMoreNhaMang: function() { this.moreNhaMang.active = !this.moreNhaMang.active, this.moreMenhGia.active = !1 },
            toggleMoreMenhGia: function() { this.moreMenhGia.active = !this.moreMenhGia.active },
            backT: function() { this.moreNhaMang.active = !1, this.moreMenhGia.active = !1 },
            infoSet: function(t, e, i, n) {
                var c = this;
                void 0 === n && (n = !1);
                var s = this;
                t.length > 0 && Promise.all(t.map(function(t, c) {
                    var a = cc.instantiate(s.prefabLeft),
                        h = a.getComponent("NapRed_itemOne");
                    if (h.init(s, e, i), n) 0 == c && (h.background.active = !0, s.NhanhMang.string = t.name), h.text.string = t.name, s.scrollviewNhaMang.content.addChild(a);
                    else {
                        var r = o.numberWithCommas(t.name),
                            d = o.numberWithCommas(t.values);
                        0 == c && (h.background.active = !0, s.MenhGia.string = r), h.text.string = r, s.scrollviewMenhGia.content.addChild(a);
                        var u = cc.instantiate(s.prefabRight);
                        (u = u.getComponent("NapRed_itemTT")).init(r, d), s.bangGia.content.addChild(u.node)
                    }
                    return h
                })).then(function(t) { c[e] = t })
            },
            onData: function(t) { void 0 === t.info || this.isLoaded || (this.isLoaded = !0, void 0 !== t.info.nhamang && this.infoSet(t.info.nhamang, "nhamangList", "NhanhMang", !0), void 0 !== t.info.menhgia && this.infoSet(t.info.menhgia, "menhgiaList", "MenhGia")) },
            onClickMua: function() {
                var t = this.editSoLuong.string >> 0;
                t > 3 || t < 0 ? cc.RedT.inGame.notice.show({ title: "MUA TH\u1eba", text: "S\u1ed1 l\u01b0\u1ee3ng kh\xf4ng h\u1ee3p l\u1ec7..." }) : 4 != this.editOTP.string.length ? cc.RedT.inGame.notice.show({ title: "L\u1ed6I", text: "M\xe3 OTP kh\xf4ng \u0111\xfang..." }) : cc.RedT.send({ shop: { mua_the: { nhamang: this.NhanhMang.string, menhgia: o.getOnlyNumberInString(this.MenhGia.string), soluong: this.editSoLuong.string, otp: this.editOTP.string } } })
            },
            onClickOTP: function() { cc.RedT.send({ otp: !0 }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    shopMuaXu: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e3d68ruZCVJyZezBdPhX4eo", "shopMuaXu");
        var n = t("Helper"),
            o = t("BrowserUtil");
        cc.Class({
            extends: cc.Component,
            properties: { xu: { default: null, type: cc.Label }, red: { default: null, type: cc.EditBox }, captcha: { default: null, type: cc.EditBox }, capchaSprite: cc.Sprite },
            onLoad: function() {
                var t = this;
                this.editboxs = [this.red, this.captcha], this.keyHandle = function(e) { return e.keyCode === cc.macro.KEY.tab ? (t.changeNextFocusEditBox(), e.preventDefault && e.preventDefault(), !1) : e.keyCode === cc.macro.KEY.enter ? (o.focusGame(), t.onClickMua(), e.preventDefault && e.preventDefault(), !1) : void 0 }
            },
            onEnable: function() { cc.sys.isBrowser && this.addEvent(), this.reCaptcha() },
            onDisable: function() { cc.sys.isBrowser && this.removeEvent(), this.clean() },
            addEvent: function() { for (var t in cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), this.editboxs) o.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1) },
            removeEvent: function() {
                for (var t in this.editboxs) o.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            },
            onKeyDown: function(t) {
                switch (t.keyCode) {
                    case cc.macro.KEY.tab:
                        this.isTop() && this.changeNextFocusEditBox();
                        break;
                    case cc.macro.KEY.enter:
                        this.isTop() && this.onClickMua()
                }
            },
            changeNextFocusEditBox: function() {
                for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
                    if (o.checkEditBoxFocus(this.editboxs[e])) { o.focusEditBox(this.editboxs[e]), t = !0; break }!t && 0 < this.editboxs.length && o.focusEditBox(this.editboxs[0])
            },
            isTop: function() { return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active },
            clean: function() { this.red.string = this.xu.string = this.captcha.string = "" },
            onChanger: function(t) {
                var e = n.getOnlyNumberInString(t),
                    i = n.numberWithCommas(e);
                this.xu.string = n.numberWithCommas(3 * e), this.red.string = "0" == i ? "" : i
            },
            onClickMua: function() { parseInt(n.isEmpty(this.red.string) || n.getOnlyNumberInString(this.red.string)) < 1e3 ? cc.RedT.inGame.notice.show({ title: "MUA XU", text: "S\u1ed1 RED mua XU t\u1ed1i thi\u1ec3u l\xe0 1.000" }) : n.isEmpty(this.captcha.string) ? cc.RedT.inGame.notice.show({ title: "MUA XU", text: "Vui l\xf2ng nh\u1eadp ch\xednh x\xe1c m\xe3 x\xe1c nh\u1eadn." }) : cc.RedT.send({ shop: { mua_xu: { red: n.getOnlyNumberInString(this.red.string), captcha: this.captcha.string } } }) },
            initCaptcha: function(t) {
                var e = this,
                    i = new Image;
                i.src = t, i.width = 150, i.height = 50, setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(i), t.handleLoadedTexture();
                    var n = new cc.SpriteFrame(t);
                    e.capchaSprite.spriteFrame = n
                }, 10)
            },
            reCaptcha: function() { cc.RedT.send({ captcha: "withdrawXu" }) }
        }), cc._RF.pop()
    }, { BrowserUtil: "BrowserUtil", Helper: "Helper" }],
    subMenuControll: [function(t, e, i) {
        "use strict";

        function n(t, e) { var i; if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) { if (Array.isArray(t) || (i = o(t)) || e && t && "number" == typeof t.length) { i && (t = i); var n = 0; return function() { return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] } } } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") } return (i = t[Symbol.iterator]()).next.bind(i) }

        function o(t, e) { if (t) { if ("string" == typeof t) return c(t, e); var i = Object.prototype.toString.call(t).slice(8, -1); return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? c(t, e) : void 0 } }

        function c(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
            return n
        }
        cc._RF.push(e, "84987GimdhLo67g4TdXG7dM", "subMenuControll"), cc.Class({
            extends: cc.Component,
            properties: { items: { default: [], type: cc.Node }, body: { default: [], type: cc.Node } },
            onLoad: function() { for (var t in this.items) this.items[t] = this.items[t].getComponent("subMenuItem") },
            onClickItem: function(t) {
                for (var e, i = n(this.items); !(e = i()).done;) {
                    var o = e.value;
                    o.node == t.target ? o.onSelect() : o.offSelect()
                }
                for (var c, s = n(this.body); !(c = s()).done;) {
                    var a = c.value;
                    a.name === t.target.name ? a.active = !0 : a.active = !1
                }
            }
        }), cc._RF.pop()
    }, {}],
    subMenuItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "19618U18J5J55/yKtlBzkGh", "subMenuItem"), cc.Class({ extends: cc.Component, properties: { background: cc.Node, background2: cc.Node, text: cc.Node }, onSelect: function() { this.background.active = !1, this.background2.active = !0, this.text.color = cc.Color.BLACK }, offSelect: function() { this.background.active = !0, this.background2.active = !1, this.text.color = cc.Color.WHITE } }), cc._RF.pop()
    }, {}],
    use_reversed_rotateBy: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "87960JtvcFF1aU8KkrHQMOf", "use_reversed_rotateBy"), cc.RotateBy._reverse = !0, cc._RF.pop()
    }, {}],
    use_reversed_rotateTo: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2696dLcP0xJi7lYKC5PO3ag", "use_reversed_rotateTo"), cc.RotateTo._reverse = !0, cc._RF.pop()
    }, {}],
    "use_v2.1.x_cc.Action": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c5c32AkWmNMf6JIQRB+AGw8", "use_v2.1.x_cc.Action"), cc.macro.ROTATE_ACTION_CCW = !0, cc._RF.pop()
    }, {}],
    x2Nap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "40f2e2WnZxLCpFHsNOfGR1e", "x2Nap"), cc.Class({ extends: cc.Component, properties: { header: cc.Node, TienTrinh: cc.Node, TheLe: cc.Node, isLoad: !1 }, init: function() { this.isLoad || (this.body = [this.TienTrinh, this.TheLe], this.header = this.header.children.map(function(t) { return t.getComponent("itemHeadMenu") }), this.isLoad = !0) }, onSelectHead: function(t, e) { this.header.forEach(function(t) { t.node.name === e ? t.select() : t.unselect() }), this.body.forEach(function(t) { t.name === e ? t.active = !0 : t.active = !1 }) }, onData: function(t) {} }), cc._RF.pop()
    }, {}]
}, {}, ["BaseControll", "3Cay", "3Cay_cuoc", "3Cay_player", "3Cay_touchCard", "AngryBird_history", "AngryBird_history_item", "AngryBird_top", "AngryBirds-item", "AngryBirds-itemR", "AngryBirds", "AngryBirds_reelsL", "AngryBirds_reelsR", "Avenger", "Avenger_history", "Avenger_top", "Avenger_dialog", "Avenger_iline", "Avenger_lines", "Avenger_bonus_item", "Avenger_playBonus", "Avenger_item", "Avenger_reel", "BanCa", "BanCa_dialog", "Fish_bullet EF", "Fish_bullet", "fish_EF", "fish_EFcoint", "fish_EFlabelMoney", "Fish_fish", "Fish_fish_group", "Fish_game", "Fish_player", "Fish_shubiao", "Fish_history", "Fish_history_item", "Fish_nap", "Fish_setting", "BauCua", "BauCua_LichSu", "BauCua_ls_item", "BauCua_linhVat", "BauCua_logMini", "BauCua_top", "BauCua_top_item", "BigBabol", "BigBabol_LichSu", "BigBabol_LichSu_item", "BigBabol_Top", "BigBabol_line", "BigBabol_main_line", "BigBabol_reel", "BigBabol_reel_item", "Candy", "Candy_bonus_item", "Candy_playBonus", "Candy_dialog", "Candy_history", "Candy_iLine", "Candy_line", "Candy_reel", "Candy_top", "candy_reel_item", "CaoThap", "CaoThap_history", "CaoThap_history_item", "CaoThap_reels", "CaoThap_top", "CaoThap_top_item", "CoTrang", "CoTrang_history", "CoTrang_top", "CoTrang_dialog", "CoTrang_iline", "CoTrang_lines", "CoTrang_bonus_item", "CoTrang_playBonus", "CoTrang_item", "CoTrang_reel", "MegaJ_history", "MegaJ_history_item", "MegaJ_top", "MegaJ_top_item", "MegaJackpot", "Mini3Cay", "Mini3Cay_history", "Mini3Cay_ihistory", "Mini3Cay_reel", "Mini3Cay_top", "MiniPoker", "MiniPoker_LichSu", "MiniPoker_LichSu_item", "MiniPoker_Top", "MiniPoker_reel", "Poker_Player", "Poker", "PokerNapGame", "PokerTo", "TaiXiu", "TaiXiuBoard", "TaiXiuBoard_item", "TaiXiuChat", "TaiXiuLichSuPhien", "TaiXiuLichSuPhien_item", "TaiXiuLichSu", "TaiXiuLichSu_item", "TaiXiuMain", "TaiXiuMain_logTips", "TaiXiu_DiaNan", "TaiXiu_efScale", "TaiXiu_money_efScale", "TaiXiuThongKe", "TaiXiuTop", "TaiXiu_topItem", "VQRed_dialog", "VQRed_history", "VQRed_history_item", "VQRed_setting", "VQRed_top", "VuongQuocRed", "VuongQuocRed_items", "VQRed_main_line", "VuongQuocRed_line", "VuongQuocRed_playBonus", "VuongQuocRed_reel", "VuongQuocRed_bigWin", "XoSo_MBHistory", "XoSo_MBHistory_item", "kq_xsmb", "MienBac_lo", "MienBac_dauduoi", "MienBac_lo2so", "MienBac_lo3so", "MienBac_lo4so", "MienBac_loxien", "XoSo_MienBac", "XoSo", "XoSo_History", "XoSo_KetQua", "XoSo_Main", "XoSo_Main_Main", "XoSo_select_item", "XocXoc", "XocXoc_dialog", "XocXoc_history", "XocXoc_history_item", "XocXoc_top", "Zeus", "Zeus_history", "Zeus_top", "Zeus_dialog", "Zeus_iline", "Zeus_lines", "Zeus_bonus_item", "Zeus_playBonus", "Zeus_item", "Zeus_reel", "BrowserUtil", "CheckOut", "Config", "DisableClick", "Card", "Helper", "MainAudio", "iconGame", "iconGameBai", "iconGameHu", "iconGameTaiXiu", "itemContentMenu", "itemHeadMenu", "Message", "Pagination", "Pagination_item", "hoverScale", "ThongBaoNoHu", "miniBigWin", "mini_warning", "full_responsive", "inputNumber", "subMenuControll", "subMenuItem", "MainGame", "DEvent", "EventAngrybird", "EventBigBabol", "EventMiniPoker", "EventTaiXiu", "EventTaiXiu_item", "EventTaiXiu_itemDay", "Dialog", "ForGotPass", "GiftCode", "BaoMat", "DangKyOTP", "DoiMatKhau", "BaoMatGame", "BaoMatTaiKhoan", "CaNhan", "KetSat", "LichSu", "LichSuAll", "LichSuAll_item", "LichSuBank", "LichSuBank_item", "LichSuChuyen", "LichSuChuyen_item", "LichSuMuaXu", "LichSuNap", "LichSuNap_item", "LichSuRut", "LichSuRut_item", "Profile", "ThongKe", "VipPoint", "Settings", "Bank", "CodePay", "MoMoPay", "bankATM", "bankNap", "bankRut", "ChuyenRed", "ChuyenRed_daily", "DaiLy", "CodePay_itembank", "NapRed", "NapRed_itemOne", "NapRed_itemTT", "NapThe", "Shop", "shopMuaTheCao", "shopMuaXu", "TieuRed", "SignIn", "SignName", "SignUp", "TheCao", "TheCao_item", "EVipPoint_item", "dialog_VipPoint", "iMessage", "iMessage_item", "x2Nap", "Header", "Menu", "MenuRoom", "MiniPanel", "dialogHuongDan", "MiniDialog", "PokerNap", "popupEvent", "popupMinigame", "popupTopHu", "popupx2Nap", "NewsContents", "NewsItem", "Notice", "bgLoading", "Splash", "EF_NoHu", "Http", "PushNohu", "CanvasHelper", "GIF", "GIFSprite", "LZW", "use_reversed_rotateBy", "use_reversed_rotateTo", "use_v2.1.x_cc.Action"]);