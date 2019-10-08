const axios = require('axios');
const SocksProxyAgent = require('socks-proxy-agent');

const Dev = require('../model/Dev');

class DevController {  

    index(req, res){        
        Dev.find({}, function(err, devs) {
            if (err)
              res.send(err);
            res.json(devs);
        });
    }
        
    async store(req, res){
        
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if(userExists) {
            return res.json(userExists);
        }
        
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar,
        });

        return res.json(dev);
    }
};

module.exports = new DevController();