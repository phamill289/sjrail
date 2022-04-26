<?php

require_once __DIR__ . '/Maintenance.php';

/**
 * Maintenance script to change the password of a given user.
 *
 * @ingroup Maintenance
 */
class ChangePassword extends Maintenance {
	public function __construct() {
		parent::__construct();
		$this->addOption( "user", "The username to operate on", false, true );
		$this->addOption( "userid", "The user id to operate on", false, true );
		$this->addOption( "password", "The password to use", true, true );
		$this->addDescription( "Change a user's password" );
	}

	public function execute() {
		$user = $this->validateUserOption( "A \"user\" or \"userid\" must be set to change the password for" );
		$password = $this->getOption( 'password' );
		$status = $user->changeAuthenticationData( [
			'username' => $user->getName(),
			'password' => $password,
			'retype' => $password,
		] );
		if ( $status->isGood() ) {
			$this->output( "Password set for " . $user->getName() . "\n" );
		} else {
			$this->fatalError( $status->getMessage( false, false, 'en' )->text() );
		}
	}
}

$maintClass = ChangePassword::class;
require_once RUN_MAINTENANCE_IF_MAIN;
