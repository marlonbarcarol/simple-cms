<!DOCTYPE html>
<html lang="en-US">
	<head>
	    <meta charset="utf-8">
	</head>
	<body syle="color: #000; font-size: 14px;">
	<h2>E-mail de contato do site.</h2>
	<div>
		<ul style="padding: 0px; margin: 0px; list-style: none;">
			<li>
				<b>Nome: </b> {!! $nome !!}
			</li>
			<li>
				<b>E-mail: </b> {!! $email !!}
			</li>
			<li>
				<b>Telefone: </b> {!! $telefone !!}
			</li>
			<li>
				<b>Mensagem: </b>  <br> {!! $mensagem !!}
			</li>
		</ul>
		<br><br>
		<span style="font-size: 10px;">Data do envio: <?php echo date("d/m/Y"); ?></span>
	</div>

	</body>
</html>