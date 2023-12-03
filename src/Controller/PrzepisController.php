<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Przepis;
use App\Service\Router;
use App\Service\Templating;

class PrzepisController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $przepiss = Przepis::findAll();
        $html = $templating->render('przepis/index.html.php', [
            'przepiss' => $przepiss,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestprzepis, Templating $templating, Router $router): ?string
    {
        if ($requestprzepis) {
            $przepis = Przepis::fromArray($requestprzepis);
            // @todo missing validation
            $przepis->save();

            $path = $router->generatePath('przepis-index');
            $router->redirect($path);
            return null;
        } else {
            $przepis = new Przepis();
        }

        $html = $templating->render('przepis/create.html.php', [
            'przepis' => $przepis,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $przepisId, ?array $requestprzepis, Templating $templating, Router $router): ?string
    {
        $przepis = Przepis::find($przepisId);
        if (! $przepis) {
            throw new NotFoundException("Missing przepis with id $przepisId");
        }

        if ($requestprzepis) {
            $przepis->fill($requestprzepis);
            // @todo missing validation
            $przepis->save();

            $path = $router->generatePath('przepis-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('przepis/edit.html.php', [
            'przepis' => $przepis,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $przepisId, Templating $templating, Router $router): ?string
    {
        $przepis = Przepis::find($przepisId);
        if (! $przepis) {
            throw new NotFoundException("Missing przepis with id $przepisId");
        }

        $html = $templating->render('przepis/show.html.php', [
            'przepis' => $przepis,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $przepisId, Router $router): ?string
    {
        $przepis = Przepis::find($przepisId);
        if (! $przepis) {
            throw new NotFoundException("Missing przepis with id $przepisId");
        }

        $przepis->delete();
        $path = $router->generatePath('przepis-index');
        $router->redirect($path);
        return null;
    }
}
