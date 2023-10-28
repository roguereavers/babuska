/*********************************************
 * RogueReavers Inc.
 *
 * Creator
 * S0mt0chukwu
  ********************************************/

function ro_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	ro_gameloop = ro_canvas = ro_context = ro_room_to_go = null, ro_canvas_id = 'roluloocanvas',
	ro_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	ro_loading = ro_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	ro_sprites = [], ro_audios = [], ro_backgrounds = [], ro_fonts = [], ro_scenes = [],
	// time:
	ro_frame_time = ro_frame_step = ro_frame_el = ro_frame_count = ro_elapsed = 0,
	ro_prev_cycle_time = ro_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	ro_r2d = -180 / Math.PI, ro_d2r = Math.PI / -180, ro_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], ro_vkeys = [],
	ro_keys_pressed = [], ro_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	ro_unpausekey = 27, ro_paused = false, ro_modal = null, ro_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	ro_tiles = [], ro_tilesi = [], ro_tilez = 256,
	// sound variables:
	ro_wav_supported = ro_detect_audio('audio/wav; codecs="1"'),
	ro_ogg_supported = ro_detect_audio('audio/ogg; codecs="vorbis"'),
	ro_mp3_supported = ro_detect_audio('audio/mpeg;'),
	// drawing:
	ro_draw_alpha = 1, ro_draw_color_red = ro_draw_color_green = ro_draw_color_blue = 0,
	ro_draw_font = "Arial 12px", ro_draw_halign = "left", ro_draw_valign = "top",
	ro_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	ro_draw_color = "rgb(" + ro_draw_color_red + "," + 
	ro_draw_color_green + "," + ro_draw_color_blue + ")", 
	ro_redraw, ro_redraw_auto = true,
	ro_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	ro_depth = [], ro_depthi = [], ro_depthu = [], ro_types = [], ro_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virroal keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	ro_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function ro_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * ro_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * ro_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * ro_r2d; }
function degtorad(_degree) { return _degree * ro_d2r; }
function radtodeg(_degree) { return _degree * ro_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!ro_wav_supported) return; break;
	case "ogg": if (!ro_ogg_supported) return; break;
	case "mp3": if (!ro_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < ro_audios.length; _s++) sound_stop( ro_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	ro_context.save();
	ro_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	ro_context.globalAlpha = ro_draw_alpha;
	ro_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	ro_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	ro_context.save();
	ro_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	ro_context.globalAlpha = ro_draw_alpha;
	ro_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	ro_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	ro_context.save();
	ro_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	ro_context.rotate(degtorad(_rotation));
	ro_context.scale(_xscale, _yscale);
	ro_context.globalAlpha = _alpha;
	ro_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	ro_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	ro_context.font = ro_draw_font;
	ro_context.textAlign = ro_draw_halign;
	ro_context.textBaseline = ro_draw_valign;
	ro_context.fillStyle = ro_context.strokeStyle = "rgba(" + ro_draw_color + ", " + ro_draw_alpha + ")";
	ro_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	ro_context.fillStyle = ro_context.strokeStyle = "rgba(" + ro_draw_color + ", " + ro_draw_alpha + ")";
	ro_context.beginPath();
	if (_outline) ro_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else ro_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	ro_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	ro_context.fillStyle = ro_context.strokeStyle = "rgba(" + ro_draw_color + ", " + ro_draw_alpha + ")";
	ro_context.beginPath();
	ro_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, ro_2pi, true );
	ro_context.closePath();
	!_outline ? ro_context.fill() : ro_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	ro_context.strokeStyle = "rgba(" + ro_draw_color + ", " + ro_draw_alpha + ")";
	ro_context.beginPath();
	ro_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	ro_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	ro_context.closePath();
	ro_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	ro_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	ro_draw_color_red = _r;
	ro_draw_color_green = _g;
	ro_draw_color_blue = _b;
	ro_draw_color = ro_draw_color_red + "," + ro_draw_color_green + "," + ro_draw_color_blue;
	ro_context.fillStyle = "rgba(" + ro_draw_color + ", " + ro_draw_alpha + ")";
	ro_context.strokeStyle = "rgb(" + ro_draw_color + ")";
}
function draw_set_linewidth(_width) { ro_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	ro_draw_font_ = _font;
	ro_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	ro_context.font = ro_draw_font;
	ro_context.textAlign = ro_draw_halign;
	ro_context.textBaseline = ro_draw_valign;
}
function draw_set_halign(_halign) { ro_draw_halign = _halign; }
function draw_set_valign(_valign) { ro_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	ro_viewport_inst = null;
	ro_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < ro_scenes.length; _r++) if (ro_scenes[_r] == room_current) _ri = _r;
	if (typeof ro_scenes[(_ri + 1)] == "object") room_goto(ro_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < ro_scenes.length; _r++) if (ro_scenes[_r] == room_current) _ri = _r;
	if (typeof ro_scenes[(_ri - 1)] == "object") room_goto(ro_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(ro_scenes[0]); }
function room_goto_last() { room_goto(ro_scenes[(ro_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	ro_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	ro_paused = true;
	ro_unpausekey = _key;
}
function modal_end() {
	if (ro_modal == null) return;
	ro_modal.instance_destroy();
	ro_modal = null;
}
function modal_start(_inst, _draw) {
	if (ro_modal != null) modal_end();
	ro_modal = _inst;
	ro_modaldraw = _draw;
}
//
function show_mouse() { ro_canvas.style.cursor = "default"; }
function hide_mouse() { ro_canvas.style.cursor = "none"; }
//
function ro_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function ro_global () { }
global = new ro_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == ro_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		ro_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == ro_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		ro_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = ro_canvas.offsetLeft + _x;
	r[0].pageY = ro_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= ro_canvas.offsetLeft;
		mouse_y -= ro_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = ro_vkeys.length, _i, _j, _c, _k,
		_dx = ro_canvas.offsetLeft, _dy = ro_canvas.offsetTop, _mx = _my = 1;
	if (ro_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) ro_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!ro_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > ro_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < ro_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < ro_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > ro_vkeys[_j].bottom) continue;
			ro_vkeys[_j].count++;
			if (!ro_vkeys[_j].down) {
				ro_vkeys[_j].down = true;
				_k = ro_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					ro_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (ro_vkeys[_i].count != 0) continue;
		if (!ro_vkeys[_i].down) continue;
		ro_vkeys[_i].down = false;
		_k = ro_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			ro_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function ro_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function ro_loading_inc() { ro_loading++; ro_load_total++; }
function ro_loading_dec() { ro_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _ro_depth_find(_d) {
	var _tl = ro_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = ro_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _ro_depth_new(_d) {
	var _i = _ro_depth_find(_d), _o = [];
	ro_depth.splice(_i, 0, _o);
	ro_depthi.splice(_i, 0, _d);
	return _i;
}
function ro_depth_add(_d, _o) {
	var _t = ro_depthi.indexOf(_d);
	if (_t == -1) _t = _ro_depth_new(_d); // create array if none
	ro_depth[_t].push(_o);
}
function ro_depth_delete(_d, _o) {
	var _t = ro_depth[ro_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function ro_depth_update() {
	var i, l = ro_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = ro_depthu[i];
		if (o.instance_active && o._depth !== undefined) ro_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) ro_depth_add(o._depth, o);
		o._depthu = false;
	}
	ro_depthu = [];
}
// Accessors:
function ro_depth_get() { return this._depth; }
function ro_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	ro_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (ro_types[_t] == undefined) ro_types[_t] = [];
	return ro_types[_t];
}
function ro_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function ro_type_delete(_o, _p) {
	var _d = ro_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function ro_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = ro_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = ro_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	ro_tiles.splice(_i, 0, _o);
	ro_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / ro_tilez),
		_ty1 = Math.floor(_y / ro_tilez),
		_tx2 = Math.floor((_x + _w) / ro_tilez),
		_ty2 = Math.floor((_y + _h) / ro_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = ro_tilesi.indexOf(_z);
	if (_e != -1) _d = ro_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = ro_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = ro_tiles[_ti];
	_tx1 = Math.floor(_x / ro_tilez);
	_ty1 = Math.floor(_y / ro_tilez);
	_tx2 = Math.floor((_x + _w) / ro_tilez);
	_ty2 = Math.floor((_y + _h) / ro_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		ro_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / ro_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / ro_tilez),
		_ty1 = Math.floor(room_viewport_y / ro_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / ro_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function ro_id_get() { return this; }
function ro_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', ro_depth_get, ro_depth_set );
	var_override(_this, 'object_index', ro_type_get, ro_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', ro_id_get, ro_idle);
	var_override(_this, 'parent', ro_parent_get, ro_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			ro_loading_inc();
			_frame.onload = ro_loading_dec;
			_frame.onerror = ro_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	ro_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (ro_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (ro_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (ro_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	ro_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	ro_loading_inc();
	_this.image.onload = ro_loading_dec;
	_this.image.onerror = ro_loading_dec;
	_this.image.src = _file;
	ro_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	ro_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('roluloogame').innerHTML = "<canvas id='" + ro_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + ro_canvas_css + "'></canvas>";
	ro_canvas = _$_(ro_canvas_id);
	ro_context = ro_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; ro_tiles = []; ro_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	ro_depth = []; ro_depthi = []; ro_depthu = []; ro_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = ro_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(ro_persist[_t]);
	instance_foreach(function(o) {
		if (ro_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	ro_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function ro_preloader() {
	var _w = Math.min(400, (ro_canvas.width * 0.6) >> 0), _h = 16,
		_x = (ro_canvas.width - _w) >> 1, _y = (ro_canvas.height - _h) >> 1,
		_p = (ro_load_total - ro_loading) / ro_load_total,
		_s = "Loading resources: " + (ro_load_total - ro_loading) + "/" + (ro_load_total);
	ro_canvas.width = ro_canvas.width;
	ro_canvas.height = ro_canvas.height;
	ro_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	ro_context.font = "italic 12px Verdana";
	ro_context.textAlign = "left";
	ro_context.textBaseline = "bottom";
	ro_context.fillStyle = ro_context.strokeStyle = "rgba(192, 192, 192, 1)";
	ro_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	ro_context.fillStyle = ro_context.strokeStyle = "rgba(0, 0, 0, 1)";
	ro_context.fillRect(_x, _y, _w, _h);
	ro_context.fillStyle = ro_context.strokeStyle = "rgba(255, 255, 255, 1)";
	ro_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	ro_context.fillText(_s, _x, _y - 2);
}

function ro_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		ro_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	ro_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) ro_type_add(o, _i);
	//ro_type_add(_i._object_index, _i);
	//if (_i.parent != null) ro_type_add(_i.parent, _i);
	ro_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) ro_type_delete(o._object_index_, _i);
	//ro_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) ro_type_delete(_i, _i.parent._object_index_);
	ro_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in ro_depth) {
		_l = ro_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = ro_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function ro_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	ro_persist.push(_o);
	instance_deactivate(_o);
}
function ro_room_switchto(_dest) {
	ro_persist = [];
	instance_foreach(ro_room_switchto_);
	room_current = _dest;
	ro_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function ro_step() {
	// object step events:
	ro_trash = [];
	var ro_deptho, ro_depthl, _obj_, _objd_, _h, _v;
	for (ro_depthd in ro_depth) {
		ro_depthc = ro_depth[ro_depthd];
		ro_depthl = ro_depthc.length;
		for (ro_deptho = 0; ro_deptho < ro_depthl; ro_deptho++) {
			_obj_ = ro_depthc[ro_deptho];
			// is viewport object?
			if (room_viewport_object != null && ro_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				ro_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * ro_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (ro_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (ro_viewport_inst.x < room_viewport_x + _h) room_viewport_x = ro_viewport_inst.x - _h;
		if (ro_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = ro_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (ro_viewport_inst.y < room_viewport_y + _v) room_viewport_y = ro_viewport_inst.y - _v;
		if (ro_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = ro_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function ro_draw() {
	// clear canvas:
	if (room_background_color_show) {
		ro_canvas.width = ro_canvas.width;
		ro_canvas.height = ro_canvas.height;
		// set background color:
		ro_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	ro_render_back();
	tile_layer_last = 0;
	var ro_depthc, ro_depthv, ro_deptho, ro_depthl, _obj_;
	for (ro_depthd in ro_depth) {
		ro_depthc = ro_depth[ro_depthd];
		ro_depthv = ro_depthi[ro_depthd];
		for (; ro_tilesi[tile_layer_last] >= ro_depthv && tile_layer_last < ro_tiles.length; tile_layer_last++)
		{
			tile_lrender(ro_tiles[tile_layer_last]);
		}
		ro_depthl = ro_depthc.length;
		for (ro_deptho = 0; ro_deptho < ro_depthl; ro_deptho++) {
			_obj_ = ro_depthc[ro_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < ro_tiles.length; tile_layer_last++) {
		tile_lrender(ro_tiles[tile_layer_last]);
	}
}

function ro_prestep() {
	// clear mouse states and keypressed / keyrelesed staroses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < ro_keys_pressed.length; _k++) key_pressed[ro_keys_pressed[_k]] = false;
	for (_k = 0; _k < ro_keys_released.length; _k++) key_released[ro_keys_released[_k]] = false;
	ro_keys_pressed = [];
	ro_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < ro_trash.length; _r++) {
		_obj_ = ro_trash[_r];
		if (ro_modal == _obj_) ro_modal = null;
		_obj_.depth = undefined;
		ro_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) ro_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function ro_loop() {
	// calculate render time
	ro_frame_time = ro_gettime();
	ro_elapsed = (ro_frame_time - ro_prev_frame_time);
	ro_frame_step += ro_elapsed;
	ro_frame_el += ro_elapsed;
	// continue game with the UN-Pause key
	if (ro_paused && keyboard_check_pressed(ro_unpausekey)) ro_paused = false;
	//
	if (ro_room_to_go != null && ro_canvas == null) ro_room_switchto(ro_room_to_go);
	// render game:
	if (ro_frame_step >= 1000 / room_speed && ro_loading == 0 && ro_canvas != null && !ro_paused) {
		ro_frame_count++;
		ro_elapsed = ro_frame_time - ro_prev_cycle_time;
		ro_prev_cycle_time = ro_frame_time;
		ro_frame_step -= 1000 / room_speed;
		if (ro_frame_step < 0 || ro_frame_step > 1024) ro_frame_step = 0;
		// start next room, if any:
		if (ro_room_to_go != null) ro_room_switchto(ro_room_to_go);
		//
		ro_redraw = ro_redraw_auto;
		if (ro_modal != null) {
			ro_modal.on_step();
			if (ro_modal != null) ro_modal.on_end_step();
		} else ro_step();
		ro_depth_update();
		if (ro_redraw) {
			if (ro_modal == null || ro_modaldraw) ro_draw();
			else ro_modal.on_draw();
		}
		ro_depth_update();
		ro_prestep();
		ro_depth_update();
	} else if (ro_loading > 0) ro_preloader();
	// calculate fps:
	if (ro_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(ro_frame_count * 1000 / ro_frame_el);
		if (fps > room_speed) fps = room_speed;
		ro_frame_el = ro_frame_count = 0;
	}
	// repeat
	ro_prev_frame_time = ro_frame_time;
	setTimeout(ro_gameloop, 5);
}
ro_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/


/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __spr_player() { 
__sprite_init__(this, spr_player, 40, 40, 20, 20, 'Circle', 16, 0, 40, 0, 40, ['img/spr_player_0.png']);
}; var spr_player = new __spr_player();

function __spr_block() { 
__sprite_init__(this, spr_block, 40, 40, 0, 0, 'Box', 20, 0, 40, 0, 40, ['img/spr_block_0.png']);
}; var spr_block = new __spr_block();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/


/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/


/***********************************************************************
 * FONTS
 ***********************************************************************/


/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __obj_player() {
__instance_init__(this, obj_player, null, 1, 0, spr_player, 1, 0);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

// WHEN THE RIGHT ARROW IS PUSHED
// MOVES THE PLAYER TO THE RIGHT
if ( keyboard_check( vk_right )) {
	x = x + 5;
}

// WHEN THE LEFT ARROW IS PUSHED
// MOVES THE PLAYER TO THE LEFT
if ( keyboard_check( vk_left )) {
	x = x - 5;
}

// WHEN THE UP ARROW IS PUSHED
// MOVES THE PLAYER TO UP
if ( keyboard_check( vk_up )) {
	y = y - 5;
}

// WHEN THE DOWN ARROW IS PUSHED
// MOVES THE PLAYER TO DOWN
if ( keyboard_check( vk_down )) {
	y = y + 5;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, obj_block);
if(this.other != null) {

// STOP THE PLAYER IF HITS THE BLOCK
// PLACE BACK TO ITS PREVIOUS POSITION

x = xprevious;
y = yprevious;
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_player = new __obj_player();

function __obj_block() {
__instance_init__(this, obj_block, null, 1, 0, spr_block, 1, 2);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_block = new __obj_block();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __test_level() { 
this.tiles = [
];
this.objects = [
[{o:obj_player, x:320, y:220}],
[{o:obj_block, x:400, y:280}],
[{o:obj_block, x:400, y:240}],
[{o:obj_block, x:400, y:200}],
[{o:obj_block, x:400, y:160}],
[{o:obj_block, x:400, y:120}],
[{o:obj_block, x:200, y:120}],
[{o:obj_block, x:200, y:160}],
[{o:obj_block, x:200, y:200}],
[{o:obj_block, x:200, y:240}],
[{o:obj_block, x:200, y:280}],
[{o:obj_block, x:240, y:280}],
[{o:obj_block, x:280, y:280}],
[{o:obj_block, x:360, y:280}],
[{o:obj_block, x:320, y:280}],
[{o:obj_block, x:240, y:120}],
[{o:obj_block, x:360, y:120}]];
this.start = function() {
__room_start__(this, test_level, 640, 480, 60, 46, 90, 65, null, 0, 0, 0, 640, 480, null, 50, 0);
};
}
var test_level = new __test_level();
ro_scenes.push(test_level);
ro_room_to_go = test_level;


/***********hmmm***************************/



ro_gameloop = ro_loop;
ro_loop();
