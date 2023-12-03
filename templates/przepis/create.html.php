<?php

/** @var \App\Model\Przepis $przepis */
/** @var \App\Service\Router $router */

$title = 'Create Przepis';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Przepis</h1>
    <form action="<?= $router->generatePath('przepis-create') ?>" method="przepis" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="przepis-create">
    </form>

    <a href="<?= $router->generatePath('przepis-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
