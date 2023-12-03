<?php
namespace App\Model;

use App\Service\Config;

class Przepis
{
    private ?int $id = null;
    private ?string $subject = null;
    private ?string $skladniki = null;
    private ?string $kroki=null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Przepis
    {
        $this->id = $id;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): Przepis
    {
        $this->subject = $subject;

        return $this;
    }
    public function getskladniki():?string{return $this->skladniki;}
    public function setskladniki(?string $skladniki):Przepis{
        $this->skladniki=$skladniki; 
        return $this;}
    public function getkroki():?string{return $this->kroki;}
    public function setkroki(?string $kroki):Przepis{
        $this->kroki=$kroki;
        return $this;
    }
   
    public static function fromArray($array): Przepis
    {
        $przepis = new self();
        $przepis->fill($array);

        return $przepis;
    }

    public function fill($array): Przepis
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['subject'])) {
            $this->setSubject($array['subject']);
        }
        if (isset($array['skladniki'])) {
            $this->setskladniki($array['skladniki']);
        }
        if (isset($array['kroki'])) {
            $this->setkroki($array['kroki']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM przepis';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $przepiss = [];
        $przepissArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($przepissArray as $przepisArray) {
            $przepiss[] = self::fromArray($przepisArray);
        }

        return $przepiss;
    }

    public static function find($id): ?Przepis
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM przepis WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $przepisArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $przepisArray) {
            return null;
        }
        $przepis = Przepis::fromArray($przepisArray);

        return $przepis;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO przepis (subject, skladniki , kroki) VALUES (:subject, :skladniki,:kroki)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'subject' => $this->getSubject(),
                'skladniki' => $this->getskladniki(),
                'kroki'=>$this->getkroki(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE przepis SET subject = :subject,  skladniki = :skladniki,kroki=:kroki WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':subject' => $this->getSubject(),
                ':skladniki' => $this->getskladniki(),
                ':kroki'=>$this->getkroki(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM przepis WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setSubject(null);
        $this->setskladniki(null);
        $this->setkroki(null);
    }
}
