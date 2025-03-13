var proxy = "SOCKS5 10.168.1.101:7890; PROXY 10.168.1.101:17890";

function FindProxyForURL(url, host) {
    if (shExpMatch(host,"*google*")
        || shExpMatch(host,"*chrome*")
        || shExpMatch(host,"*gstatic*")
        || shExpMatch(host,"*youtube*")
        || shExpMatch(host,"*ytimg*")
        || shExpMatch(host,"*ggpht*")
        || shExpMatch(host,"*facebook*")
        || shExpMatch(host,"*fbcdn*")
        || shExpMatch(host,"*twitter*")
        || shExpMatch(host,"*twimg*")
        || shExpMatch(host,"*gist*")
        || shExpMatch(host,"*github*")
        || shExpMatch(host,"*wikipedia*")
        || shExpMatch(host,"*stackoverflow*")
        || shExpMatch(host,"*wikimedia*")
        || shExpMatch(host,"*xvideos*")
        || shExpMatch(host,"*porn*")
        || shExpMatch(host,"*.phncdn.com")
        || shExpMatch(host,"*.trafficjunky.net")
        || shExpMatch(host,"*sis001*")
        || shExpMatch(host,"*rubygems*")
        || shExpMatch(host,"*weather*")
        || shExpMatch(host,"*amazonaws*")
        || shExpMatch(host,"*doubleclick.net")
        || shExpMatch(host,"*.doubleclick.net")
        || shExpMatch(host,"*cloudfront.net")
        || shExpMatch(host,"*shadowsocks.com")
        || shExpMatch(host,"*.io")
        || shExpMatch(host,"*.binance.com")
        || shExpMatch(host,"*.bnbstatic.com")
        || shExpMatch(host,"ntotheblock.com")
        || shExpMatch(host,"disqus.com")
        || shExpMatch(host,"*.disqus.com")
        || shExpMatch(host,"*openai.com")
        || shExpMatch(host,"*openai-hk.com")
        || shExpMatch(host,"*open-hk.com")
        || shExpMatch(host,"*vimeo*")
        || shExpMatch(host,"*docker*")
        || shExpMatch(host,"*apache.org")
        ) {
        return proxy; 
    }

    return "DIRECT"; 
}