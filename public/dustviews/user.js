(function(){dust.register("user.dust",body_0);function body_0(chk,ctx){return chk.write("<p>Hi ").reference(ctx.get("firstName"),ctx,"h").write(" ").reference(ctx.get("lastName"),ctx,"h").write("</p>");}return body_0;})();