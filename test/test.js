'use strict';
var assert = require('assert');
var nodeWeixinPay = require('../');

var nodeWeixinConfig = require('node-weixin-config');
var validator = require('validator');

var merchant = require('./config/merchant');

var app = require('./config/app');

describe('node-weixin-pay node module', function () {

  it('should be abel to handle callback', function () {
    var xml = ' <xml><appid><![CDATA[' +
      app.id + ']]></appid> <bank_type><![CDATA[CMB_CREDIT]]></bank_type> <cash_fee><![CDATA[1]]></cash_fee> <fee_type><![CDATA[CNY]]></fee_type> <is_subscribe><![CDATA[Y]]></is_subscribe> <mch_id><![CDATA[' +
      merchant.id + ']]></mch_id> <nonce_str><![CDATA[3UvYKTNeBfugpPC1wnIjAfl3NuG2Y0qD]]></nonce_str> <openid><![CDATA[oonTrs-hfXi6lZU2RbHMyXZJZqgk]]></openid> <out_trade_no><![CDATA[1440529715283]]></out_trade_no> <result_code><![CDATA[SUCCESS]]></result_code> <return_code><![CDATA[SUCCESS]]></return_code> <sign><![CDATA[73106901DDB8622648FFD4B67F1F7EDD]]></sign> <time_end><![CDATA[20150826030843]]></time_end> <total_fee>1</total_fee> <trade_type><![CDATA[JSAPI]]></trade_type> <transaction_id><![CDATA[1010080207201508260709669960]]></transaction_id> </xml>';
    var req = {rawBody: xml};
    var res = {
      json: function() {

      }
    };
    nodeWeixinPay.callback.notify(app, merchant, req, res, function(error, result) {
      assert.equal(true, error !== true);
      assert.equal(true, result.is_subscribe === 'Y');
      assert.equal(true, result.trade_type === 'JSAPI');
      assert.equal(true, result.bank_type === 'CMB_CREDIT');
      assert.equal(true, result.total_fee === '1');
      assert.equal(true, result.fee_type === 'CNY');
      assert.equal(true, result.transaction_id === '1010080207201508260709669960');
      assert.equal(true, result.out_trade_no === '1440529715283');
      assert.equal(true, result.time_end === '20150826030843');
    });
  });
});
