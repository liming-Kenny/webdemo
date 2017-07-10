-- author: yjs

local ski 		= require("ski")
local log 		= require("log")
local udp 		= require("ski.udp")
local js  		= require("cjson.safe")

js.encode_keep_buffer(false)
js.encode_sparse_array(true)

local encode, decode = js.encode, js.decode
local srv_port = 50010

local dir = "/tmp/httphdr"
local fp
local max_size = 1024*1000
local tmp_path = string.format("%s/httphdr.tmp", dir)
local current_path = string.format("%s/httphdr.txt", dir)
local function save_to_file(s)
	if not fp then
		local err
		fp, err = io.open(tmp_path, "a+")
		if not fp then 
			log.error("open %s fail %s", tmp_path, err)
			return 
		end 
	end
	
	fp:write(s, "\n")
	
	local size = fp:seek("cur")
	if size < max_size then
		return 
	end 
	
	fp:close()
	fp = nil
	os.remove(current_path)
	os.rename(tmp_path, current_path)
	os.execute("ps auxf | grep httphdr_report.sh | grep -v grep >/dev/null 2>&1 || ./httphdr_report.sh &")
end

local cache = {}
local function parse_httphdr(s) 
	local m = decode(s)
	if not m then 
		print("invalid http hdr", s)
		return 
	end 
	
	local flowid, type, data = m.flowid, m.type, m.data 	assert(flowid and type and data)
	if type == "request" then 
		cache[flowid] = {request = data, time = os.date("%Y%m%d %X"), uptime = ski.time()}
		return 
	end

	-- response 
	local item = cache[flowid]
	if not item then 
		--print("do not find request", s)
		return
	end
	
	cache[flowid] = nil
	local diff = ski.time() - item.uptime 
	if diff > 60 then 
		print("inavlid match", flowid, js.encode(item), s)
		return
	end 
	
	item.uptime, item.response = nil, data
	save_to_file(js.encode(item))
end

local function start_udp_server()
	local udpsrv = udp.new()
	local r, e = udpsrv:bind("127.0.0.1", srv_port) 			assert(r, e)
	while true do
		local s = udpsrv:recv()
		if s then
			parse_httphdr(s)
		end
	end
end 
 
local function main()
	log.setmodule("httphdr")
	os.execute("mkdir -p " .. dir)
	ski.go(start_udp_server)
end

ski.run(main)
